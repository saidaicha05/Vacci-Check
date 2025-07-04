import React, { ReactNode } from "react";

// Props pour Table
interface TableProps {
  children: ReactNode; // Contenu du tableau (thead, tbody, etc.)
  className?: string; // className optionnelle pour le style
}

// Props pour TableHeader
interface TableHeaderProps {
  children: ReactNode; // Ligne(s) d'en-tête
  className?: string; // className optionnelle pour le style
}

// Props pour TableBody
interface TableBodyProps {
  children: ReactNode; // Ligne(s) du corps
  className?: string; // className optionnelle pour le style
}

// Props pour TableRow
interface TableRowProps {
  children: ReactNode; // Cellules (th ou td)
  className?: string; // className optionnelle pour le style
}

// Props pour TableCell
interface TableCellProps {
  children: ReactNode; // Contenu de la cellule
  isHeader?: boolean; // Si vrai, rend comme <th>, sinon <td>
  className?: string; // className optionnelle pour le style
}

// Composant Table
const Table: React.FC<TableProps> = ({ children, className }) => {
  return <table className={`min-w-full  ${className}`}>{children}</table>;
};

// Composant TableHeader
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return <thead className={className}>{children}</thead>;
};

// Composant TableBody
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return <tbody className={className}>{children}</tbody>;
};

// Composant TableRow
const TableRow: React.FC<TableRowProps> = ({ children, className }) => {
  return <tr className={className}>{children}</tr>;
};

// Composant TableCell
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  const CellTag = isHeader ? "th" : "td";
  return <CellTag className={` ${className}`}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
