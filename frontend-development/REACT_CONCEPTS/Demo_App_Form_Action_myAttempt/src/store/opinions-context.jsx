import { createContext, useEffect, useState } from "react";

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id) {
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/upvote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("refuse to update vote");
      return;
    }

    const upVoteOpinion = await response.json();

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return upVoteOpinion;
        }
        return opinion;
      });
    });
  }

  async function downvoteOpinion(id) {
    const response = await fetch(
      `http://localhost:3000/opinions/${id}/downvote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      console.log("refuse to downvote");
      return;
    }

    const downVoteOpinion = await response.json();

    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return downVoteOpinion;
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return (
    <OpinionsContext.Provider value={contextValue}>
      {children}
    </OpinionsContext.Provider>
  );
}
