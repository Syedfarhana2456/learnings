"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bookmark,
  PencilIcon,
  Trash,
  TrashIcon,
  Plus,
  Search,
  Filter,
} from "lucide-react";
import AddToPlaylistModal from "./add-to-playlist";
import CreatePlaylistModal from "./create-playlist";
import {
  createPlaylist,
  deleteProblem,
  addProblemToPlaylist,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const ProblemsTable = ({ problems, user }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] =
    useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState(null);

  // Extract all unique tags from problems
  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];
    const tagsSet = new Set();
    problems.forEach((p) => p.tags?.forEach((t) => tagsSet.add(t)));
    return Array.from(tagsSet);
  }, [problems]);

  // Define allowed difficulties
  const difficulties = ["EASY", "MEDIUM", "HARD"];

  // Filter problems based on search, difficulty, and tags
  const filteredProblems = useMemo(() => {
    return (problems || [])
      .filter((problem) =>
        problem.title.toLowerCase().includes(search.toLowerCase())
      )
      .filter((problem) =>
        difficulty === "ALL" ? true : problem.difficulty === difficulty
      )
      .filter((problem) =>
        selectedTag === "ALL" ? true : problem.tags?.includes(selectedTag)
      );
  }, [problems, search, difficulty, selectedTag]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage);
  const paginatedProblems = useMemo(() => {
    return filteredProblems.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredProblems, currentPage]);

  const handleDelete = async (id) => {
    const result = await deleteProblem(id);
    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.error);
    }
  };

  const handleCreatePlaylist = async (data) => {
    try {
      const response = await fetch("/api/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsCreateModalOpen(false);
        toast.success("Playlist created successfully");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error creating playlist:", error);
      toast.error(error.message || "Failed to create playlist");
    }
  };

  const handleAddToPlaylist = async (problemId, playlistId) => {
    try {
      const response = await fetch("/api/playlists/add-problem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, playlistId }),
      });

      const result = await response.json();

      if (result.success) {
        setIsAddToPlaylistModalOpen(false);
        toast.success("Problem added to playlist");
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Error adding to playlist:", error);
      toast.error(error.message || "Failed to add problem to playlist");
    }
  };

  const getDifficultyVariant = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "default";
      case "MEDIUM":
        return "secondary";
      case "HARD":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "HARD":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
          <p className="text-muted-foreground">
            Manage and solve coding problems
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Playlist
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-medium">Filters</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by title..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Difficulties</SelectItem>
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff.charAt(0).toUpperCase() +
                        diff.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedTag} onValueChange={setSelectedTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">All Tags</SelectItem>
                  {allTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Solved</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="w-[120px]">Difficulty</TableHead>
                <TableHead className="w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedProblems.length > 0 ? (
                paginatedProblems.map((problem) => {
                  const isSolved = problem.solvedBy.length > 0;
                  return (
                    <TableRow key={problem.id}>
                      <TableCell>
                        <Checkbox
                          checked={isSolved}
                          disabled
                          className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <Link
                          href={`/problem/${problem.id}`}
                          className="text-primary hover:underline transition-colors"
                        >
                          {problem.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {(problem.tags || []).map((tag, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-50"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`${getDifficultyColor(
                            problem.difficulty
                          )} border-0 font-medium`}
                        >
                          {problem.difficulty}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {user?.role === "ADMIN" && (
                            <>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(problem.id)}
                              >
                                <TrashIcon className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" disabled>
                                <PencilIcon className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProblemId(problem.id);
                              setIsAddToPlaylistModalOpen(true);
                            }}
                            className="gap-2"
                          >
                            <Bookmark className="h-4 w-4" />
                            <span className="hidden sm:inline">Save</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 opacity-50" />
                      <p>No problems found matching your criteria.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of{" "}
            {filteredProblems.length} problems
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreatePlaylistModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePlaylist}
      />

      <AddToPlaylistModal
        isOpen={isAddToPlaylistModalOpen}
        onClose={() => setIsAddToPlaylistModalOpen(false)}
        onSubmit={handleAddToPlaylist}
        problemId={selectedProblemId}
      />
    </div>
  );
};

export default ProblemsTable;
