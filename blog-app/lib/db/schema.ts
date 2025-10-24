import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { use } from "react";

export const user = pgTable("user", {
  id: varchar("id", { length: 255 }).primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: boolean("emailVerified").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id),
  token: varchar("token", { length: 255 }).notNull(),
  expiresAt: timestamp("expiresAt").defaultNow().notNull(),
  ipAddress: varchar("ipAddress", { length: 255 }).notNull(),
  userAgent: varchar("userAgent", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => user.id),
  accountId: varchar("accountId", { length: 255 }).notNull(),
  providerId: varchar("providerId", { length: 255 }).notNull(),
  //   accessToken: varchar("accessToken", { length: 255 }),
  //   refreshToken: varchar("refreshToken", { length: 255 }),
  //   accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  //   refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  //   scope: varchar("scope", { length: 255 }),
  //   idToken: varchar("idToken", { length: 255 }),
  password: varchar("password", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const post = pgTable("post", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique(),
  content: text("content").notNull(),
  authorId: varchar("authorId", { length: 255 })
    .notNull()
    .references(() => user.id),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const userRelations = relations(post, ({ one }) => ({
  author: one(user, {
    fields: [post.authorId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  author: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  author: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const schema = { user, session, account, post };
