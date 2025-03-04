"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  LinearProgress,
  Tooltip,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import React, { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import MainComponent from "../actionitem/components/mainComponent";
// import { useUser } from "@clerk/nextjs";

export type GoalsPageProps = {};

export type Card = {
  id: string;
  title: string;
  hours: string;
  rationale: string;
  isExpanded: boolean;
};

const GoalsPage: React.FC<GoalsPageProps> = () => {
  const [goalInput, setGoalInput] = React.useState("");
  // const goals = useQuery(api.goals.get);

  const actionItems = useQuery(api.actionItems.get);

  //   const { user } = useUser();

  const [weeklyCards, setWeeklyCards] = useState<Card[]>([]);
  const [onceOffCards, setOnceOffCards] = useState<Card[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const generateOutline = async () => {
    // Assuming goalInput contains the goal from user input
    if (!goalInput.trim()) return; // Simple validation to ensure there's a goal

    const card = onceOffCards;
    setIsLoading(true); // Start loading animation
    console.log("Generating outline for goal: ", goalInput);
    try {
      const response: any = await fetch(
        "http://localhost:6002/generateGoalOutline",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            goalName: goalInput,
            // userId: user?.id,
            tasks: card,
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok.");

      const data = await response.json();

      const onceOffCards = data.onceOffCards.map((card: Card) => ({
        ...card,
        isExpanded: false,
      }));
      const weeklyCards = data.weeklyCards.map((card: Card) => ({
        ...card,
        isExpanded: false,
      }));

      // Assuming data contains onceOffCards and weeklyCards
      setOnceOffCards(onceOffCards);
      setWeeklyCards(weeklyCards);
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setIsLoading(false); // Stop loading animation
    }
  };

  const handleOnceOffCardChangeTitle = (id: string, title: string) => {
    console.log("id", id);
    const newCards = onceOffCards.map((card) => {
      if (card.id === id) {
        return { ...card, title };
      }
      return card;
    });
    setOnceOffCards(newCards);
  };

  const handleWeeklyCardChangeTitle = (id: string, title: string) => {
    console.log("id", id);
    const newCards = weeklyCards.map((card) => {
      if (card.id === id) {
        return { ...card, title };
      }
      return card;
    });
    setWeeklyCards(newCards);
  };

  const createPlan = async () => {
    const planData = {
      //   userId: user?.id, // This should be dynamically set, perhaps from user session data
      goalName: goalInput,
      tasks: [...onceOffCards, ...weeklyCards], // Assuming this is your state for tasks
      // events: weeklyCards, // Assuming this is your state for weekly tasks/events
    };

    try {
      const response = await fetch("http://localhost:6002/createPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(planData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong with creating the plan");
      }

      const result = await response.json();
      console.log("Plan created successfully:", result);
      // Handle success (e.g., show confirmation message)
    } catch (error) {
      console.error("Error creating plan:", error);
      // Handle error (e.g., show error message)
    }
  };
  const handleWeeklyCardChangeHours = (id: string, hours: string) => {
    const newCards = onceOffCards.map((card) => {
      if (card.id === id) {
        return { ...card, hours };
      }
      return card;
    });
    setWeeklyCards(newCards);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="text-center pt-10">
        <h1 className="text-4xl font-bold text-white mb-4">Goals</h1>
        <p className="text-lg text-white mb-8">
          What would you like to accomplish today
        </p>

        <div className="w-[800px] mx-auto p-8 bg-white rounded-lg shadow-lg">
          <div className="flex flex-col text-left">
            <div className="block mb-2 ml-1 text-sm text-left w-full text-gray-900 dark:text-gray-300 self-center font-bold ">
              Prompt
            </div>
            <input
              type="text"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              placeholder="Type a goal"
              className="w-full border-2 border-gray-200 p-4 rounded-lg  text-black"
            />
          </div>

          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">Action Items</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>

          <div className=" w-max h-max">
            <MainComponent />
          </div>
          {isLoading ? (
            <div className="w-[90%] mx-auto my-6 flex flex-col">
              <div className="text-black mb-2">Generating your plan</div>
              <LinearProgress />
            </div>
          ) : (
            <button
              className="px-6 py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
              onClick={() => {
                // if (weeklyCards.length > 0) {
                //   createPlan();
                // } else {
                //   generateOutline();
                // }
              }}
            >
              {weeklyCards.length > 0 ? "Create Plan" : "Generate Outline"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// export default App;

//     <div className="flex flex-col w-full items-center mt-5">

//       <h1>Goals Page</h1>
//       <GoalsForm />
//     </div>
//   );
// };

export default GoalsPage;
