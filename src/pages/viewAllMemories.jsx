import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./viewAllMemories.css";

async function FetchMemories() {
  try {
    const response = await fetch("http://localhost:8080/memories", {
      method: "GET",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // Throw error for non-200 responses
      throw new Error(`Server error: ${response.status}`);
    }
  } catch (err) {
    console.log("Fetch error:", err);
    // Re-throw the error so it can be caught by the calling function
    throw err;
  }
}

function formatDateRelative(dateString) {
  if (!dateString) return "Unknown date";

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "1 day ago";
  } else if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  } else {
    return date.toLocaleDateString();
  }
}

// Function to group memories into columns for better layout
function groupMemoriesIntoColumns(memories, cardsPerColumn = 2) {
  if (memories.length === 0) return [];

  const columns = [];
  for (let i = 0; i < memories.length; i += cardsPerColumn) {
    columns.push(memories.slice(i, i + cardsPerColumn));
  }
  return columns;
}

function ViewAllMemories() {
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteMemory = async (memoryId) => {
    try {
      const response = await fetch("http://localhost:8080/memories", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: memoryId }),
      });

      if (response.ok) {
        // Remove the deleted memory from the state
        setMemories((prevMemories) =>
          prevMemories.filter((memory) => memory._id !== memoryId)
        );

        setAlert({
          show: true,
          message: "Memory deleted successfully!",
          type: "success",
        });

        // Auto-hide alert after 3 seconds
        setTimeout(
          () => setAlert({ show: false, message: "", type: "" }),
          3000
        );
      } else {
        throw new Error(`Failed to delete memory: ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting memory:", err);
      setAlert({
        show: true,
        message: "Failed to delete memory. Please try again.",
        type: "danger",
      });

      // Auto-hide alert after 5 seconds
      setTimeout(() => setAlert({ show: false, message: "", type: "" }), 5000);
    }
  };
  useEffect(() => {
    const getMemories = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const data = await FetchMemories();
        setMemories(data || []); // Show alert if no memories found
        if (!data || data.length === 0) {
          setAlert({
            show: true,
            message: "No memories found in the database",
            type: "info",
          });
          // Auto-hide alert after 5 seconds
          setTimeout(
            () => setAlert({ show: false, message: "", type: "" }),
            5000
          );
        }
      } catch (err) {
        console.error("Error fetching memories:", err);
        setAlert({
          show: true,
          message:
            "Failed to connect to server. Please check if the backend is running.",
          type: "danger",
        });
        setError("Failed to load memories");
        // Auto-hide alert after 5 seconds
        setTimeout(
          () => setAlert({ show: false, message: "", type: "" }),
          5000
        );
      } finally {
        setLoading(false);
      }
    };

    getMemories();
  }, []);

  if (loading) {
    return (
      <div className="neonBox">
        <div className="neon-loader">
          <div className="neon-loader-ring"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {alert.show && (
          <div className={`custom-alert custom-alert-${alert.type}`}>
            {alert.message}
            <button
              type="button"
              className="alert-close-btn"
              onClick={() => setAlert({ show: false, message: "", type: "" })}
            >
              ×
            </button>
          </div>
        )}{" "}
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <h2 className="oswaldText middler">All Memories</h2>{" "}
      {alert.show && (
        <div className={`custom-alert custom-alert-${alert.type}`}>
          {alert.message}
          <button
            type="button"
            className="alert-close-btn"
            onClick={() => setAlert({ show: false, message: "", type: "" })}
          >
            ×
          </button>
        </div>
      )}{" "}
      <div className="container">
        {memories.length === 0 ? (
          <div className="text-center">
            <p>No memories found</p>
          </div>
        ) : // For desktop: group into columns with 2 cards each
        // For mobile: render directly (CSS handles single column)
        window.innerWidth >= 992 ? (
          groupMemoriesIntoColumns(memories, 2).map((column, columnIndex) => (
            <div className="memory-column" key={columnIndex}>
              {column.map((memory, index) => {
                const globalIndex = columnIndex * 2 + index;
                return (
                  <div
                    className="card memory-card text-center"
                    key={globalIndex}
                  >
                    <div className="card-header">Memory #{globalIndex + 1}</div>{" "}
                    <div className="card-body">
                      <h3 className="card-title">
                        {memory.title || "Untitled"}
                      </h3>
                      <p className="card-text">{memory.content}</p>
                      <div className="buttonDiv">
                        <Link
                          to={`/updateMemory`}
                          state={{ memoryData: memory }}
                        >
                          <button className="btn btn-primary">Update</button>
                        </Link>
                        <button
                          className="btn btn-delete"
                          onClick={() => deleteMemory(memory._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                    <div className="card-footer text-body-secondary">
                      {formatDateRelative(memory.date || memory.createdAt)}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          // For tablet and mobile: render cards directly
          memories.map((memory, index) => (
            <div className="card memory-card text-center" key={index}>
              <div className="card-header">Memory #{index + 1}</div>{" "}
              <div className="card-body">
                <h3 className="card-title">{memory.title || "Untitled"}</h3>{" "}
                <p className="card-text">{memory.content}</p>{" "}
                <div className="buttonDiv">
                  <Link to={`/updateMemory`} state={{ memoryData: memory }}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteMemory(memory._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="card-footer text-body-secondary">
                {formatDateRelative(memory.date || memory.createdAt)}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default ViewAllMemories;
