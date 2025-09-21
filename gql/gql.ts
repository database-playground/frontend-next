/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query ChallengeStatisticsQuery {\n    me {\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n": typeof types.ChallengeStatisticsQueryDocument,
    "\n  fragment QuestionCard on Question {\n    id\n    title\n    description\n    difficulty\n    category\n\n    ...QuestionSolvedStatus\n  }\n": typeof types.QuestionCardFragmentDoc,
    "\n    fragment QuestionSolvedStatus on Question {\n        solved\n        attempted\n    }\n": typeof types.QuestionSolvedStatusFragmentDoc,
    "\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.ListQuestionsDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n  query ChallengeStatisticsQuery {\n    me {\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n": types.ChallengeStatisticsQueryDocument,
    "\n  fragment QuestionCard on Question {\n    id\n    title\n    description\n    difficulty\n    category\n\n    ...QuestionSolvedStatus\n  }\n": types.QuestionCardFragmentDoc,
    "\n    fragment QuestionSolvedStatus on Question {\n        solved\n        attempted\n    }\n": types.QuestionSolvedStatusFragmentDoc,
    "\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.ListQuestionsDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n": types.BasicUserInfoDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ChallengeStatisticsQuery {\n    me {\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query ChallengeStatisticsQuery {\n    me {\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionCard on Question {\n    id\n    title\n    description\n    difficulty\n    category\n\n    ...QuestionSolvedStatus\n  }\n"): (typeof documents)["\n  fragment QuestionCard on Question {\n    id\n    title\n    description\n    difficulty\n    category\n\n    ...QuestionSolvedStatus\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment QuestionSolvedStatus on Question {\n        solved\n        attempted\n    }\n"): (typeof documents)["\n    fragment QuestionSolvedStatus on Question {\n        solved\n        attempted\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;