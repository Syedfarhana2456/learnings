import { getJudge0LanguageId, pollBatchResults, submitBatch } from "@/lib/judge0";
import { currentUserRole, getCurrentUser } from "@/modules/auth/actions";

import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { resolveMetadata } from "next/dist/lib/metadata/resolve-metadata";


export async function POST(request) {
  try {
    const userRole = await currentUserRole();
    const user = await getCurrentUser();

    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    const {
      title,
      description,
      difficulty,
      tags,
      examples,
      constraints,
      testCases,
      codeSnippets,
      referenceSolutions,
    } = body;

    // Basic validation
    if (!title || !description || !difficulty || !testCases || !codeSnippets || !referenceSolutions) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate test cases
    if (!Array.isArray(testCases) || testCases.length === 0) {
      return NextResponse.json(
        { error: "At least one test case is required" },
        { status: 400 }
      );
    }

    // Validate reference solutions
    if (!referenceSolutions || typeof referenceSolutions !== 'object') {
      return NextResponse.json(
        { error: "Reference solutions must be provided for all supported languages" },
        { status: 400 }
      );
    }

    for (const [language, solutionCode] of Object.entries(referenceSolutions)) {
      // Step 2.1: Get Judge0 language ID for the current language
      const languageId = getJudge0LanguageId(language);
      if (!languageId) {
        return NextResponse.json(
          { error: `Unsupported language: ${language}` },
          { status: 400 }
        );
      }

      // Step 2.2: Prepare Judge0 submissions for all test cases
      const submissions = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        language_id: languageId,
        stdin: input,
        expected_output: output,
      }));

      
   

      // Step 2.3: Submit all test cases in one batch
      const submissionResults = await submitBatch(submissions);

      // Step 2.4: Extract tokens from response
      const tokens = submissionResults.map((res) => res.token);

      // Step 2.5: Poll Judge0 until all submissions are done
      const results = await pollBatchResults(tokens);

      // Step 2.6: Validate that each test case passed (status.id === 3)
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        console.log(`Test case ${i + 1} details:`, {
          input: submissions[i].stdin,
          expectedOutput: submissions[i].expected_output,
          actualOutput: result.stdout,
          status: result.status,
          language: language,
          error: result.stderr || result.compile_output,
        });
        
        if (result.status.id !== 3) {
          return NextResponse.json(
            {
              error: `Validation failed for ${language}`,
              testCase: {
                input: submissions[i].stdin,
                expectedOutput: submissions[i].expected_output,
                actualOutput: result.stdout,
                error: result.stderr || result.compile_output,
              },
              details: result,
            },
            { status: 400 }
          );
        }
      }
    }

    // Step 3: Save the problem in the database after all validations pass
      const newProblem = await db.problem.create({
        data: {
          title,
          description,
          difficulty,
          tags,
          examples,
          constraints,
          testCases,
          codeSnippets,
          referenceSolutions,
          userId: user.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Problem created successfully",
        data: newProblem,
      }, { status: 201 });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Failed to save problem to database" },
        { status: 500 }
      );
  } 
}
