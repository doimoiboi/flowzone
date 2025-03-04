import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  distractions: defineTable({
    name: v.string(),
    dateTime: v.string(),
    actionItemId: v.id("actionItems"),
  }),

  stresses: defineTable({
    level: v.number(),
    dateTime: v.string(),
    actionItemId: v.id("actionItems"),
  }),
  actionItems: defineTable({
    name: v.string(),
    priority: v.string(), // Assuming ActionItemPriority is an enum or similar, stored as string
    dueDate: v.string(),
    status: v.string(), // Assuming ActionItemStatus is an enum or similar, stored as string
    isDone: v.boolean(),
    projects: v.array(v.string()),
    startTime: v.string(),
    endTime: v.string(),
    location: v.object({
      latitude: v.number(),
      longitude: v.number(),
      name: v.string(),
    }),
    notes: v.string(),
    stress: v.array(v.string()),
    distractions: v.array(v.string()),
  }),

  dailyMetrics: defineTable({
    date: v.string(),
    ratingOfDay: v.float64(), // Assuming RatingOfDay is an enum or similar, stored as string
    wins: v.array(v.string()), // Change to v.array(v.string())
    losses: v.array(v.string()), // Change to v.array(v.string())
    weight: v.number(),
    actionItemsCompleted: v.array(v.id("actionItems")),
    sleepHours: v.float64(),
  }),
});
