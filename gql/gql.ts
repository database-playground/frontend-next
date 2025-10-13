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
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      difficulty\n      category\n\n      ...QuestionSolvedStatus\n    }\n  }\n": typeof types.QuestionHeaderDocument,
    "\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n": typeof types.CompareAnswerDocument,
    "\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.CorrectAnswerDocument,
    "\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      database {\n        id\n        slug\n        relationFigure\n      }\n    }\n  }\n": typeof types.DatabaseRelationshipDocument,
    "\n  query QuestionDescription($id: ID!) {\n    question(id: $id) {\n      id\n      description\n    }\n  }\n": typeof types.QuestionDescriptionDocument,
    "\n  mutation SubmitAnswer($id: ID!, $answer: String!) {\n    submitAnswer(id: $id, answer: $answer) {\n      error\n    }\n  }\n": typeof types.SubmitAnswerDocument,
    "\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n": typeof types.MyAnswerDocument,
    "\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        ...DatabaseStructure\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n": typeof types.SqlEditorContextDocument,
    "\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedCode\n        submittedAt\n      }\n    }\n  }\n": typeof types.SubmissionHistoryDocument,
    "\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n": typeof types.DatabaseStructureFragmentDoc,
    "\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n": typeof types.ChallengeStatisticsDocument,
    "\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": typeof types.ListQuestionsDocument,
    "\n  fragment MaterialsSchemaCard on Database {\n    id\n    slug\n    description\n  }\n": typeof types.MaterialsSchemaCardFragmentDoc,
    "\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n": typeof types.MaterialsSchemaContentDocument,
    "\n  query MaterialsSchema {\n    databases {\n      id\n      ...MaterialsSchemaCard\n    }\n  }\n": typeof types.MaterialsSchemaDocument,
    "\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n": typeof types.CompletedQuestionsDocument,
    "\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      first: 10\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n    ) {\n      edges {\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n": typeof types.CompletedQuestionRankingDocument,
    "\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(first: 10, filter: { order: DESC, by: POINTS, period: $period }) {\n      edges {\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n": typeof types.PointsRankingDocument,
    "\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            id\n            ...PointFragment\n          }\n        }\n      }\n    }\n  }\n": typeof types.PointsDocument,
    "\n  fragment PointFragment on Point {\n    description\n    points\n  }\n": typeof types.PointFragmentFragmentDoc,
    "\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n": typeof types.ResolvedQuestionsDocument,
    "\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionInfoFragment\n    }\n  }\n": typeof types.QuestionInfoDocument,
    "\n  fragment QuestionInfoFragment on Question {\n    id\n    title\n    description\n    difficulty\n    category\n  }\n": typeof types.QuestionInfoFragmentFragmentDoc,
    "\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        submittedCode\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n": typeof types.UserAnswerResultDocument,
    "\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }": typeof types.QuestionSchemaDocument,
    "\n  fragment QuestionCard on Question {\n    id\n    title\n    description\n    difficulty\n    category\n\n    ...QuestionSolvedStatus\n  }\n": typeof types.QuestionCardFragmentDoc,
    "\n    fragment QuestionSolvedStatus on Question {\n        solved\n        attempted\n    }\n": typeof types.QuestionSolvedStatusFragmentDoc,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      difficulty\n      category\n\n      ...QuestionSolvedStatus\n    }\n  }\n": types.QuestionHeaderDocument,
    "\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n": types.CompareAnswerDocument,
    "\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.CorrectAnswerDocument,
    "\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      database {\n        id\n        slug\n        relationFigure\n      }\n    }\n  }\n": types.DatabaseRelationshipDocument,
    "\n  query QuestionDescription($id: ID!) {\n    question(id: $id) {\n      id\n      description\n    }\n  }\n": types.QuestionDescriptionDocument,
    "\n  mutation SubmitAnswer($id: ID!, $answer: String!) {\n    submitAnswer(id: $id, answer: $answer) {\n      error\n    }\n  }\n": types.SubmitAnswerDocument,
    "\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n": types.MyAnswerDocument,
    "\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        ...DatabaseStructure\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n": types.SqlEditorContextDocument,
    "\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedCode\n        submittedAt\n      }\n    }\n  }\n": types.SubmissionHistoryDocument,
    "\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n": types.DatabaseStructureFragmentDoc,
    "\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n": types.ChallengeStatisticsDocument,
    "\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n": types.ListQuestionsDocument,
    "\n  fragment MaterialsSchemaCard on Database {\n    id\n    slug\n    description\n  }\n": types.MaterialsSchemaCardFragmentDoc,
    "\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n": types.MaterialsSchemaContentDocument,
    "\n  query MaterialsSchema {\n    databases {\n      id\n      ...MaterialsSchemaCard\n    }\n  }\n": types.MaterialsSchemaDocument,
    "\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n": types.CompletedQuestionsDocument,
    "\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      first: 10\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n    ) {\n      edges {\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n": types.CompletedQuestionRankingDocument,
    "\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(first: 10, filter: { order: DESC, by: POINTS, period: $period }) {\n      edges {\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n": types.PointsRankingDocument,
    "\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            id\n            ...PointFragment\n          }\n        }\n      }\n    }\n  }\n": types.PointsDocument,
    "\n  fragment PointFragment on Point {\n    description\n    points\n  }\n": types.PointFragmentFragmentDoc,
    "\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n": types.ResolvedQuestionsDocument,
    "\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionInfoFragment\n    }\n  }\n": types.QuestionInfoDocument,
    "\n  fragment QuestionInfoFragment on Question {\n    id\n    title\n    description\n    difficulty\n    category\n  }\n": types.QuestionInfoFragmentFragmentDoc,
    "\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        submittedCode\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n": types.UserAnswerResultDocument,
    "\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }": types.QuestionSchemaDocument,
    "\n  fragment QuestionCard on Question {\n    id\n    title\n    description\n    difficulty\n    category\n\n    ...QuestionSolvedStatus\n  }\n": types.QuestionCardFragmentDoc,
    "\n    fragment QuestionSolvedStatus on Question {\n        solved\n        attempted\n    }\n": types.QuestionSolvedStatusFragmentDoc,
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
export function graphql(source: "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      difficulty\n      category\n\n      ...QuestionSolvedStatus\n    }\n  }\n"): (typeof documents)["\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      id\n      title\n      difficulty\n      category\n\n      ...QuestionSolvedStatus\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"): (typeof documents)["\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      database {\n        id\n        slug\n        relationFigure\n      }\n    }\n  }\n"): (typeof documents)["\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      database {\n        id\n        slug\n        relationFigure\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionDescription($id: ID!) {\n    question(id: $id) {\n      id\n      description\n    }\n  }\n"): (typeof documents)["\n  query QuestionDescription($id: ID!) {\n    question(id: $id) {\n      id\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SubmitAnswer($id: ID!, $answer: String!) {\n    submitAnswer(id: $id, answer: $answer) {\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation SubmitAnswer($id: ID!, $answer: String!) {\n    submitAnswer(id: $id, answer: $answer) {\n      error\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        ...DatabaseStructure\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        ...DatabaseStructure\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedCode\n        submittedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedCode\n        submittedAt\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n        attemptedQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListQuestions($where: QuestionWhereInput, $after: Cursor) {\n    questions(where: $where, first: 10, after: $after) {\n      edges {\n        node {\n          id\n          ...QuestionCard\n          ...QuestionSolvedStatus\n        }\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsSchemaCard on Database {\n    id\n    slug\n    description\n  }\n"): (typeof documents)["\n  fragment MaterialsSchemaCard on Database {\n    id\n    slug\n    description\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n"): (typeof documents)["\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MaterialsSchema {\n    databases {\n      id\n      ...MaterialsSchemaCard\n    }\n  }\n"): (typeof documents)["\n  query MaterialsSchema {\n    databases {\n      id\n      ...MaterialsSchemaCard\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      first: 10\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n    ) {\n      edges {\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      first: 10\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n    ) {\n      edges {\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(first: 10, filter: { order: DESC, by: POINTS, period: $period }) {\n      edges {\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(first: 10, filter: { order: DESC, by: POINTS, period: $period }) {\n      edges {\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            id\n            ...PointFragment\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            id\n            ...PointFragment\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointFragment on Point {\n    description\n    points\n  }\n"): (typeof documents)["\n  fragment PointFragment on Point {\n    description\n    points\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        totalQuestions\n        solvedQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionInfoFragment\n    }\n  }\n"): (typeof documents)["\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionInfoFragment\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionInfoFragment on Question {\n    id\n    title\n    description\n    difficulty\n    category\n  }\n"): (typeof documents)["\n  fragment QuestionInfoFragment on Question {\n    id\n    title\n    description\n    difficulty\n    category\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        submittedCode\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        submittedCode\n        status\n        queryResult {\n          columns\n          rows\n        }\n        error\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }"): (typeof documents)["\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }"];
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
export function graphql(source: "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n\n      group {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;