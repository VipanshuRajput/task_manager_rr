import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
      marginTop: 20
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={btnStyle}
      >
        <ChevronLeft size={16} /> Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...btnStyle,
            background: page === currentPage ? "#4f46e5" : "#fff",
            color: page === currentPage ? "#fff" : "#000",
            border: "1px solid #ddd"
          }}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={btnStyle}
      >
        Next <ChevronRight size={16} />
      </button>
    </div>
  );
}

const btnStyle = {
  display: "flex",
  alignItems: "center",
  gap: 4,
  padding: "6px 12px",
  borderRadius: 6,
  border: "1px solid #ddd",
  background: "#f9fafb",
  cursor: "pointer"
};
