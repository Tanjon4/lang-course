"use client";

import React from "react";
import { Box, Card, Typography } from "@mui/material";

export default function UsersManagement() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Gestion des utilisateurs
      </Typography>

      <Card className="shadow p-4 mb-4">
        <Typography variant="h6">Étudiants</Typography>
        <div className="mt-2">Liste des étudiants avec progression et certificats</div>
      </Card>
      <Card className="shadow p-4 mb-4">
        <Typography variant="h6">Formateurs</Typography>
        <div className="mt-2">Liste des formateurs, cours créés, revenus</div>
      </Card>
      <Card className="shadow p-4">
        <Typography variant="h6">Admins & rôles</Typography>
        <div className="mt-2">Gestion des rôles et permissions</div>
      </Card>
    </Box>
  );
}
