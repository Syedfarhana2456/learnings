"use client";
import { Editor } from "@monaco-editor/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

const problemSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  constraints: z.string().min(1, "Constraints are required"),
  hints: z.string().optional(),
  editorial: z.string().optional(),
  testCases: z
    .array(
      z.object({
        input: z.string().min(1, "Input is required"),
        output: z.string().min(1, "Output is required"),
      })
    )
    .min(1, "At least one test case is required"),
  examples: z.object({
    JAVASCRIPT: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    PYTHON: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
    JAVA: z.object({
      input: z.string().min(1, "Input is required"),
      output: z.string().min(1, "Output is required"),
      explanation: z.string().optional(),
    }),
  }),
  codeSnippets: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript code snippet is required"),
    PYTHON: z.string().min(1, "Python code snippet is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
  referenceSolutions: z.object({
    JAVASCRIPT: z.string().min(1, "JavaScript solution is required"),
    PYTHON: z.string().min(1, "Python solution is required"),
    JAVA: z.string().min(1, "Java solution is required"),
  }),
});

// Sample problem data for pre-filling the form
const sampledpData = {
  title: "Climbing Stairs",
  description:
    "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
  difficulty: "EASY",
  tags: ["Dynamic Programming", "Math", "Memoization"],
  constraints: "1 <= n <= 45",
  hints:
    "To reach the nth step, you can either come from the (n-1)th step or the (n-2)th step.",
  editorial:
    "This is a classic dynamic programming problem. The number of ways to reach the nth step is the sum of the number of ways to reach the (n-1)th step and the (n-2)th step, forming a Fibonacci-like sequence.",
  testCases: [
    {
      input: "2",
      output: "2",
    },
    {
      input: "3",
      output: "3",
    },
    {
      input: "4",
      output: "5",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: "n = 2",
      output: "2",
      explanation:
        "There are two ways to climb to the top:\n1. 1 step + 1 step\n2. 2 steps",
    },
    PYTHON: {
      input: "n = 3",
      output: "3",
      explanation:
        "There are three ways to climb to the top:\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    },
    JAVA: {
      input: "n = 4",
      output: "5",
      explanation:
        "There are five ways to climb to the top:\n1. 1 step + 1 step + 1 step + 1 step\n2. 1 step + 1 step + 2 steps\n3. 1 step + 2 steps + 1 step\n4. 2 steps + 1 step + 1 step\n5. 2 steps + 2 steps",
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Write your code here
}

// Parse input and execute
const readline = require('readline');
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout,
terminal: false
});

rl.on('line', (line) => {
const n = parseInt(line.trim());
const result = climbStairs(n);

console.log(result);
rl.close();
});`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Write your code here
      pass

# Input parsing
if __name__ == "__main__":
  import sys
  
  # Parse input
  n = int(sys.stdin.readline().strip())
  
  # Solve
  sol = Solution()
  result = sol.climbStairs(n)
  
  # Print result
  print(result)`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Write your code here
      return 0;
  }
  
  public static void main(String[] args) {
      Scanner scanner = new Scanner(System.in);
      int n = Integer.parseInt(scanner.nextLine().trim());
      
      // Use Main class instead of Solution
      Main main = new Main();
      int result = main.climbStairs(n);
      
      System.out.println(result);
      scanner.close();
  }
}`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
* @param {number} n
* @return {number}
*/
function climbStairs(n) {
// Base cases
if (n <= 2) {
  return n;
}

// Dynamic programming approach
let dp = new Array(n + 1);
dp[1] = 1;
dp[2] = 2;

for (let i = 3; i <= n; i++) {
  dp[i] = dp[i - 1] + dp[i - 2];
}

return dp[n];
}`,
    PYTHON: `class Solution:
  def climbStairs(self, n: int) -> int:
      # Base cases
      if n <= 2:
          return n
      
      # Dynamic programming approach
      dp = [0] * (n + 1)
      dp[1] = 1
      dp[2] = 2
      
      for i in range(3, n + 1):
          dp[i] = dp[i - 1] + dp[i - 2]
      
      return dp[n]`,
    JAVA: `import java.util.Scanner;

class Main {
  public int climbStairs(int n) {
      // Base cases
      if (n <= 2) {
          return n;
      }
      
      // Dynamic programming approach
      int[] dp = new int[n + 1];
      dp[1] = 1;
      dp[2] = 2;
      
      for (int i = 3; i <= n; i++) {
          dp[i] = dp[i - 1] + dp[i - 2];
      }
      
      return dp[n];
  }
}`,
  },
};

// Sample problem data for another type of question
const sampleStringProblem = {
  title: "Valid Palindrome",
  description:
    "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers. Given a string s, return true if it is a palindrome, or false otherwise.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints:
    "1 <= s.length <= 2 * 10^5\ns consists only of printable ASCII characters.",
  hints:
    "Consider using two pointers, one from the start and one from the end, moving towards the center.",
  editorial:
    "We can use two pointers approach to check if the string is a palindrome. One pointer starts from the beginning and the other from the end, moving towards each other.",
  testCases: [
    {
      input: "A man, a plan, a canal: Panama",
      output: "true",
    },
    {
      input: "race a car",
      output: "false",
    },
    {
      input: " ",
      output: "true",
    },
  ],
  examples: {
    JAVASCRIPT: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    PYTHON: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
    JAVA: {
      input: 's = "A man, a plan, a canal: Panama"',
      output: "true",
      explanation: '"amanaplanacanalpanama" is a palindrome.',
    },
  },
  codeSnippets: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Write your code here
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Write your code here
          pass
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
       
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
  referenceSolutions: {
    JAVASCRIPT: `/**
   * @param {string} s
   * @return {boolean}
   */
  function isPalindrome(s) {
    // Convert to lowercase and remove non-alphanumeric characters
    s = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    // Check if it's a palindrome
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
      if (s[left] !== s[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }
  
  // Add readline for dynamic input handling
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });
  
  // Process input line
  rl.on('line', (line) => {
    // Call solution with the input string
    const result = isPalindrome(line);
    
    // Output the result
    console.log(result ? "true" : "false");
    rl.close();
  });`,
    PYTHON: `class Solution:
      def isPalindrome(self, s: str) -> bool:
          # Convert to lowercase and keep only alphanumeric characters
          filtered_chars = [c.lower() for c in s if c.isalnum()]
          
          # Check if it's a palindrome
          return filtered_chars == filtered_chars[::-1]
  
  # Input parsing
  if __name__ == "__main__":
      import sys
      # Read the input string
      s = sys.stdin.readline().strip()
      
      # Call solution
      sol = Solution()
      result = sol.isPalindrome(s)
      
      # Output result
      print(str(result).lower())  # Convert True/False to lowercase true/false`,
    JAVA: `import java.util.Scanner;

public class Main {
    public static String preprocess(String s) {
        return s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
    }

    public static boolean isPalindrome(String s) {
        s = preprocess(s);
        int left = 0, right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) return false;
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String input = sc.nextLine();

        boolean result = isPalindrome(input);
        System.out.println(result ? "true" : "false");
    }
}
`,
  },
};

const CodeEditor = ({ value, onChange, language = "javascript" }) => {
  // Map language names to Monaco Editor language IDs
  const languageMap = {
    javascript: "javascript",
    python: "python",
    java: "java",
  };

  return (
    <div className="border rounded-md bg-slate-950 text-slate-50">
      <div className="px-4 py-2 bg-slate-800 border-b text-sm font-mono">
        {language}
      </div>
      <div className="h-[300px] w-full">
        <Editor
          height="300px"
          defaultLanguage={languageMap[language]}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 18,
            lineNumbers: "on",
            readOnly: false,
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

const CreateProblemForm = () => {
  const router = useRouter();
  const [sampleType, setSampleType] = useState("DP");
  const [isLoading, setIsloading] = useState(false);

  const form = useForm({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      testCases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
    },
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replaceTestCases,
  } = useFieldArray({
    control,
    name: "testCases",
  });

   const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async(values)=>{
    try {
        setIsloading(true)
        const response = await fetch("/api/create-problem",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(values)
        })
        toast.success(response.message || "Problem created successfully")
        router.push("/problems")
    } catch (error) {
          console.error("Error creating problem:", error);
      toast.error(error.message || "Failed to create problem");
    }
    finally{
         setIsloading(false);
    }
  }

   const loadSampleData = () => {
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem;
    replaceTags(sampleData.tags.map((tag) => tag));
    replaceTestCases(sampleData.testCases.map((tc) => tc));
    reset(sampleData);
  };


  return (
      <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Card className="shadow-xl">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-3xl flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-600" />
              Create Problem
            </CardTitle>

            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex border rounded-md">
                <Button
                  type="button"
                  variant={sampleType === "DP" ? "default" : "outline"}
                  size="sm"
                  className="rounded-r-none"
                  onClick={() => setSampleType("DP")}
                >
                  DP Problem
                </Button>
                <Button
                  type="button"
                  variant={sampleType === "string" ? "default" : "outline"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setSampleType("string")}
                >
                  String Problem
                </Button>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={loadSampleData}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Load Sample
              </Button>
            </div>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-lg font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter problem title"
                  className="mt-2 text-lg"
                />
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description" className="text-lg font-semibold">
                  Description
                </Label>
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Enter problem description"
                  className="mt-2 min-h-32 text-base resize-y"
                />
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="difficulty" className="text-lg font-semibold">
                  Difficulty
                </Label>
                <Controller
                  name="difficulty"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EASY">
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            Easy
                          </Badge>
                        </SelectItem>
                        <SelectItem value="MEDIUM">
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800"
                          >
                            Medium
                          </Badge>
                        </SelectItem>
                        <SelectItem value="HARD">
                          <Badge
                            variant="secondary"
                            className="bg-red-100 text-red-800"
                          >
                            Hard
                          </Badge>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.difficulty && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-amber-600" />
                    Tags
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendTag("")}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Tag
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <Input
                        {...register(`tags.${index}`)}
                        placeholder="Enter tag"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTag(index)}
                        disabled={tagFields.length === 1}
                        className="p-2"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.tags.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Test Cases
                  </CardTitle>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => appendTestCase({ input: "", output: "" })}
                    className="gap-2"
                  >
                    <Plus className="w-4 h-4" /> Add Test Case
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {testCaseFields.map((field, index) => (
                  <Card key={field.id} className="bg-background">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-lg">
                          Test Case #{index + 1}
                        </CardTitle>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTestCase(index)}
                          disabled={testCaseFields.length === 1}
                          className="text-red-500 gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Remove
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-medium">Input</Label>
                          <Textarea
                            {...register(`testCases.${index}.input`)}
                            placeholder="Enter test case input"
                            className="mt-2 min-h-24 resize-y font-mono"
                          />
                          {errors.testCases?.[index]?.input && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.testCases[index].input.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="font-medium">Expected Output</Label>
                          <Textarea
                            {...register(`testCases.${index}.output`)}
                            placeholder="Enter expected output"
                            className="mt-2 min-h-24 resize-y font-mono"
                          />
                          {errors.testCases?.[index]?.output && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.testCases[index].output.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {errors.testCases && !Array.isArray(errors.testCases) && (
                  <p className="text-sm text-red-500">
                    {errors.testCases.message}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Code Editor Sections */}
            {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
              <Card key={language} className="bg-slate-50 dark:bg-slate-950/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-slate-600" />
                    {language}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Starter Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Starter Code Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Controller
                        name={`codeSnippets.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language.toLowerCase()}
                          />
                        )}
                      />
                      {errors.codeSnippets?.[language] && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.codeSnippets[language].message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Reference Solution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Reference Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Controller
                        name={`referenceSolutions.${language}`}
                        control={control}
                        render={({ field }) => (
                          <CodeEditor
                            value={field.value}
                            onChange={field.onChange}
                            language={language.toLowerCase()}
                          />
                        )}
                      />
                      {errors.referenceSolutions?.[language] && (
                        <p className="text-sm text-red-500 mt-2">
                          {errors.referenceSolutions[language].message}
                        </p>
                      )}
                    </CardContent>
                  </Card>

                  {/* Examples */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Example</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label className="font-medium">Input</Label>
                          <Textarea
                            {...register(`examples.${language}.input`)}
                            placeholder="Example input"
                            className="mt-2 min-h-20 resize-y font-mono"
                          />
                          {errors.examples?.[language]?.input && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.examples[language].input.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label className="font-medium">Output</Label>
                          <Textarea
                            {...register(`examples.${language}.output`)}
                            placeholder="Example output"
                            className="mt-2 min-h-20 resize-y font-mono"
                          />
                          {errors.examples?.[language]?.output && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.examples[language].output.message}
                            </p>
                          )}
                        </div>
                        <div className="md:col-span-2">
                          <Label className="font-medium">Explanation</Label>
                          <Textarea
                            {...register(`examples.${language}.explanation`)}
                            placeholder="Explain the example"
                            className="mt-2 min-h-24 resize-y"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}

            {/* Additional Information */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="font-medium">Constraints</Label>
                  <Textarea
                    {...register("constraints")}
                    placeholder="Enter problem constraints"
                    className="mt-2 min-h-24 resize-y font-mono"
                  />
                  {errors.constraints && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.constraints.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label className="font-medium">Hints (Optional)</Label>
                  <Textarea
                    {...register("hints")}
                    placeholder="Enter hints for solving the problem"
                    className="mt-2 min-h-24 resize-y"
                  />
                </div>
                <div>
                  <Label className="font-medium">Editorial (Optional)</Label>
                  <Textarea
                    {...register("editorial")}
                    placeholder="Enter problem editorial/solution explanation"
                    className="mt-2 min-h-32 resize-y"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5" />
                    Create Problem
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
};

export default CreateProblemForm;
