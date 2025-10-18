"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  Button,
  Collapse,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface Lesson {
  id: number;
  title: string;
}

interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
}

interface Level {
  id: number;
  title: string;
  chapters: Chapter[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  is_published: boolean;
  levels: Level[];
}

const API_BASE = "https://lang-courses-api.onrender.com/api";

export default function CoursesManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [expandedLevels, setExpandedLevels] = useState<{ [key: number]: boolean }>({});
  const [expandedChapters, setExpandedChapters] = useState<{ [key: number]: boolean }>({});
  
  // States pour modals
  const [openForm, setOpenForm] = useState(false);
  const [editing, setEditing] = useState<any>(null); // peut être Course / Level / Chapter / Lesson
  const [formType, setFormType] = useState<"course" | "level" | "chapter" | "lesson">("course");
  const [parentIds, setParentIds] = useState<{ courseId?: number; levelId?: number; chapterId?: number }>({});

  // Fetch tous les cours
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${API_BASE}/courses/`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleLevel = (levelId: number) => {
    setExpandedLevels(prev => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  const toggleChapter = (chapterId: number) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleOpenForm = (type: "course" | "level" | "chapter" | "lesson", item: any = null, parents: any = {}) => {
    setFormType(type);
    setEditing(item);
    setParentIds(parents);
    setOpenForm(true);
  };

  const handleCloseForm = (saved: boolean = false) => {
    setOpenForm(false);
    setEditing(null);
    setParentIds({});
    if (saved) fetchCourses();
  };

  const handleDelete = async (type: string, id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ?")) return;
    await fetch(`${API_BASE}/${type}/${id}/`, { method: "DELETE" });
    fetchCourses();
  };

  const handleTogglePublish = async (course: Course) => {
    await fetch(`${API_BASE}/courses/${course.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_published: !course.is_published }),
    });
    fetchCourses();
  };

  return (
    <Box>
      <Box className="flex justify-between items-center mb-4">
        <Typography variant="h4">Gestion des cours</Typography>
        <Button variant="contained" onClick={() => handleOpenForm("course")}>+ Créer un cours</Button>
      </Box>

      <Grid container spacing={3}>
        {courses.map(course => (
          <Grid item xs={12} md={6} key={course.id}>
            <Card className="shadow p-4 flex flex-col gap-2">
              <Box className="flex justify-between items-center">
                <Typography variant="h6">{course.title}</Typography>
                <Box className="flex gap-2">
                  <Button variant="outlined" onClick={() => handleOpenForm("course", course)}>Éditer</Button>
                  <Button
                    variant="outlined"
                    color={course.is_published ? "error" : "success"}
                    onClick={() => handleTogglePublish(course)}
                  >
                    {course.is_published ? "Dépublier" : "Publier"}
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete("courses", course.id)}>Supprimer</Button>
                </Box>
              </Box>
              <Typography className="text-gray-500">{course.description}</Typography>

              {/* Niveaux */}
              {course.levels.map(level => (
                <Card key={level.id} className="mt-2 p-2 border border-gray-200">
                  <Box className="flex justify-between items-center">
                    <Typography>{level.title}</Typography>
                    <Box className="flex gap-1">
                      <Button size="small" onClick={() => handleOpenForm("level", level, { courseId: course.id })}>Éditer</Button>
                      <Button size="small" color="error" onClick={() => handleDelete("levels", level.id)}>Supprimer</Button>
                      <IconButton onClick={() => toggleLevel(level.id)}>
                        {expandedLevels[level.id] ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    </Box>
                  </Box>
                  <Collapse in={expandedLevels[level.id]}>
                    {/* Chapitres */}
                    {level.chapters.map(chapter => (
                      <Card key={chapter.id} className="mt-2 p-2 border border-gray-300">
                        <Box className="flex justify-between items-center">
                          <Typography>{chapter.title}</Typography>
                          <Box className="flex gap-1">
                            <Button size="small" onClick={() => handleOpenForm("chapter", chapter, { levelId: level.id })}>Éditer</Button>
                            <Button size="small" color="error" onClick={() => handleDelete("chapters", chapter.id)}>Supprimer</Button>
                            <IconButton onClick={() => toggleChapter(chapter.id)}>
                              {expandedChapters[chapter.id] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                          </Box>
                        </Box>
                        <Collapse in={expandedChapters[chapter.id]}>
                          <Box className="mt-2 ml-4 flex flex-col gap-1">
                            {chapter.lessons.map(lesson => (
                              <Card key={lesson.id} className="p-1 border border-gray-400 flex justify-between items-center">
                                <Typography>{lesson.title}</Typography>
                                <Box className="flex gap-1">
                                  <Button size="small" onClick={() => handleOpenForm("lesson", lesson, { chapterId: chapter.id })}>Éditer</Button>
                                  <Button size="small" color="error" onClick={() => handleDelete("lessons", lesson.id)}>Supprimer</Button>
                                </Box>
                              </Card>
                            ))}
                            <Button size="small" onClick={() => handleOpenForm("lesson", null, { chapterId: chapter.id })}>+ Ajouter une leçon</Button>
                          </Box>
                        </Collapse>
                      </Card>
                    ))}
                    <Button size="small" onClick={() => handleOpenForm("chapter", null, { levelId: level.id })}>+ Ajouter un chapitre</Button>
                  </Collapse>
                </Card>
              ))}
              <Button size="small" onClick={() => handleOpenForm("level", null, { courseId: course.id })}>+ Ajouter un niveau</Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Form modal */}
      {openForm && <FormModal type={formType} item={editing} parentIds={parentIds} onClose={handleCloseForm} />}
    </Box>
  );
}

// Modal générique pour création/édition
interface FormModalProps {
  type: "course" | "level" | "chapter" | "lesson";
  item: any;
  parentIds: { courseId?: number; levelId?: number; chapterId?: number };
  onClose: (saved?: boolean) => void;
}

function FormModal({ type, item, parentIds, onClose }: FormModalProps) {
  const [title, setTitle] = useState(item?.title || "");
  const [description, setDescription] = useState(item?.description || "");

  const saveItem = async () => {
    let url = `${API_BASE}/${type}s/`;
    let method: "POST" | "PATCH" = "POST";

    const body: any = { title };
    if (description) body.description = description;

    // Ajouter ids parent si création
    if (!item) {
      if (type === "level") body.course = parentIds.courseId;
      if (type === "chapter") body.level = parentIds.levelId;
      if (type === "lesson") body.chapter = parentIds.chapterId;
    } else {
      method = "PATCH";
      url += `${item.id}/`;
    }

    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    onClose(true);
  };

  return (
    <Dialog open={true} onClose={() => onClose(false)} fullWidth maxWidth="sm">
      <DialogTitle>{item ? `Éditer ${type}` : `Créer ${type}`}</DialogTitle>
      <DialogContent className="flex flex-col gap-4 mt-2">
        <TextField label="Titre" value={title} onChange={e => setTitle(e.target.value)} fullWidth />
        {(type === "course" || type === "chapter") && (
          <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} fullWidth multiline rows={3} />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)}>Annuler</Button>
        <Button variant="contained" onClick={saveItem}>Sauvegarder</Button>
      </DialogActions>
    </Dialog>
  );
}
