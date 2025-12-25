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
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      ...QuestionSolvedStatus\n      id\n      category\n      difficulty\n\n      title\n\n      statistics {\n        attemptedUsers\n        correctSubmissionCount\n        passedUsers\n        submissionCount\n      }\n    }\n  }\n": typeof types.QuestionHeaderDocument,
    "\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.CompareAnswerDocument,
    "\n  query ChallengeCorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.ChallengeCorrectAnswerDocument,
    "\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        relationFigure\n        slug\n      }\n    }\n  }\n": typeof types.DatabaseRelationshipDocument,
    "\n  query QuestionDescription($id: ID!) {\n    question(id: $id) {\n      id\n      description\n    }\n  }\n": typeof types.QuestionDescriptionDocument,
    "\n  mutation SubmitAnswer($id: ID!, $answer: String!) {\n    submitAnswer(id: $id, answer: $answer) {\n      error\n    }\n  }\n": typeof types.SubmitAnswerDocument,
    "\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n": typeof types.MyAnswerDocument,
    "\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        ...DatabaseStructure\n        id\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n": typeof types.SqlEditorContextDocument,
    "\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedAt\n        submittedCode\n      }\n    }\n  }\n": typeof types.SubmissionHistoryDocument,
    "\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n": typeof types.DatabaseStructureFragmentDoc,
    "\n  query TagFilterSection {\n    questionCategories\n  }\n": typeof types.TagFilterSectionDocument,
    "\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        attemptedQuestions\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n": typeof types.ChallengeStatisticsDocument,
    "\n  query ListQuestions($after: Cursor, $where: QuestionWhereInput) {\n    questions(after: $after, first: 10, where: $where) {\n      edges {\n        node {\n          ...QuestionCard\n          ...QuestionSolvedStatus\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": typeof types.ListQuestionsDocument,
    "\n  fragment MaterialsSchemaCard on Database {\n    id\n    description\n    slug\n  }\n": typeof types.MaterialsSchemaCardFragmentDoc,
    "\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n": typeof types.MaterialsSchemaContentDocument,
    "\n  query MaterialsSchema {\n    databases {\n      ...MaterialsSchemaCard\n      id\n    }\n  }\n": typeof types.MaterialsSchemaDocument,
    "\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n": typeof types.CompletedQuestionsDocument,
    "\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n      first: 10\n    ) {\n      edges {\n        score\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n": typeof types.CompletedQuestionRankingDocument,
    "\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(filter: { order: DESC, by: POINTS, period: $period }, first: 10) {\n      edges {\n        score\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n": typeof types.PointsRankingDocument,
    "\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            ...PointHistoryLine\n            id\n          }\n        }\n      }\n    }\n  }\n": typeof types.PointsDocument,
    "\n  fragment PointHistoryLine on Point {\n    id\n    description\n    points\n  }\n": typeof types.PointHistoryLineFragmentDoc,
    "\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n": typeof types.ResolvedQuestionsDocument,
    "\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionForPrompt\n    }\n  }\n": typeof types.QuestionInfoDocument,
    "\n  fragment QuestionForPrompt on Question {\n    id\n    category\n    description\n    difficulty\n    title\n  }\n": typeof types.QuestionForPromptFragmentDoc,
    "\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": typeof types.CorrectAnswerDocument,
    "\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        submittedCode\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n": typeof types.UserAnswerResultDocument,
    "\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }": typeof types.QuestionSchemaDocument,
    "\n  fragment QuestionCard on Question {\n    ...QuestionSolvedStatus\n    id\n    category\n    description\n    difficulty\n\n    title\n\n    statistics {\n      attemptedUsers\n      passedUsers\n    }\n  }\n": typeof types.QuestionCardFragmentDoc,
    "\n    fragment QuestionSolvedStatus on Question {\n        id\n        attempted\n        solved\n    }\n": typeof types.QuestionSolvedStatusFragmentDoc,
    "\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      ...QuestionSolvedStatus\n      id\n      category\n      difficulty\n\n      title\n\n      statistics {\n        attemptedUsers\n        correctSubmissionCount\n        passedUsers\n        submissionCount\n      }\n    }\n  }\n": types.QuestionHeaderDocument,
    "\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.CompareAnswerDocument,
    "\n  query ChallengeCorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.ChallengeCorrectAnswerDocument,
    "\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        relationFigure\n        slug\n      }\n    }\n  }\n": types.DatabaseRelationshipDocument,
    "\n  query QuestionDescription($id: ID!) {\n    question(id: $id) {\n      id\n      description\n    }\n  }\n": types.QuestionDescriptionDocument,
    "\n  mutation SubmitAnswer($id: ID!, $answer: String!) {\n    submitAnswer(id: $id, answer: $answer) {\n      error\n    }\n  }\n": types.SubmitAnswerDocument,
    "\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n": types.MyAnswerDocument,
    "\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        ...DatabaseStructure\n        id\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n": types.SqlEditorContextDocument,
    "\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedAt\n        submittedCode\n      }\n    }\n  }\n": types.SubmissionHistoryDocument,
    "\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n": types.DatabaseStructureFragmentDoc,
    "\n  query TagFilterSection {\n    questionCategories\n  }\n": types.TagFilterSectionDocument,
    "\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        attemptedQuestions\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n": types.ChallengeStatisticsDocument,
    "\n  query ListQuestions($after: Cursor, $where: QuestionWhereInput) {\n    questions(after: $after, first: 10, where: $where) {\n      edges {\n        node {\n          ...QuestionCard\n          ...QuestionSolvedStatus\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n": types.ListQuestionsDocument,
    "\n  fragment MaterialsSchemaCard on Database {\n    id\n    description\n    slug\n  }\n": types.MaterialsSchemaCardFragmentDoc,
    "\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n": types.MaterialsSchemaContentDocument,
    "\n  query MaterialsSchema {\n    databases {\n      ...MaterialsSchemaCard\n      id\n    }\n  }\n": types.MaterialsSchemaDocument,
    "\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n": types.CompletedQuestionsDocument,
    "\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n      first: 10\n    ) {\n      edges {\n        score\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n": types.CompletedQuestionRankingDocument,
    "\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(filter: { order: DESC, by: POINTS, period: $period }, first: 10) {\n      edges {\n        score\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n": types.PointsRankingDocument,
    "\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            ...PointHistoryLine\n            id\n          }\n        }\n      }\n    }\n  }\n": types.PointsDocument,
    "\n  fragment PointHistoryLine on Point {\n    id\n    description\n    points\n  }\n": types.PointHistoryLineFragmentDoc,
    "\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n": types.ResolvedQuestionsDocument,
    "\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionForPrompt\n    }\n  }\n": types.QuestionInfoDocument,
    "\n  fragment QuestionForPrompt on Question {\n    id\n    category\n    description\n    difficulty\n    title\n  }\n": types.QuestionForPromptFragmentDoc,
    "\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n": types.CorrectAnswerDocument,
    "\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        submittedCode\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n": types.UserAnswerResultDocument,
    "\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }": types.QuestionSchemaDocument,
    "\n  fragment QuestionCard on Question {\n    ...QuestionSolvedStatus\n    id\n    category\n    description\n    difficulty\n\n    title\n\n    statistics {\n      attemptedUsers\n      passedUsers\n    }\n  }\n": types.QuestionCardFragmentDoc,
    "\n    fragment QuestionSolvedStatus on Question {\n        id\n        attempted\n        solved\n    }\n": types.QuestionSolvedStatusFragmentDoc,
    "\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.BasicUserInfoDocument,
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
export function graphql(source: "\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      ...QuestionSolvedStatus\n      id\n      category\n      difficulty\n\n      title\n\n      statistics {\n        attemptedUsers\n        correctSubmissionCount\n        passedUsers\n        submissionCount\n      }\n    }\n  }\n"): (typeof documents)["\n  query QuestionHeader($id: ID!) {\n    question(id: $id) {\n      ...QuestionSolvedStatus\n      id\n      category\n      difficulty\n\n      title\n\n      statistics {\n        attemptedUsers\n        correctSubmissionCount\n        passedUsers\n        submissionCount\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompareAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ChallengeCorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"): (typeof documents)["\n  query ChallengeCorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        relationFigure\n        slug\n      }\n    }\n  }\n"): (typeof documents)["\n  query DatabaseRelationship($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        relationFigure\n        slug\n      }\n    }\n  }\n"];
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
export function graphql(source: "\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query MyAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        ...DatabaseStructure\n        id\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query SqlEditorContext($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        ...DatabaseStructure\n        id\n      }\n      lastSubmission {\n        id\n        submittedCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedAt\n        submittedCode\n      }\n    }\n  }\n"): (typeof documents)["\n  query SubmissionHistory($id: ID!) {\n    question(id: $id) {\n      id\n      userSubmissions {\n        id\n        status\n        submittedAt\n        submittedCode\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment DatabaseStructure on Database {\n    id\n    structure {\n      tables {\n        columns\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TagFilterSection {\n    questionCategories\n  }\n"): (typeof documents)["\n  query TagFilterSection {\n    questionCategories\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        attemptedQuestions\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query ChallengeStatistics {\n    me {\n      id\n      submissionStatistics {\n        attemptedQuestions\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ListQuestions($after: Cursor, $where: QuestionWhereInput) {\n    questions(after: $after, first: 10, where: $where) {\n      edges {\n        node {\n          ...QuestionCard\n          ...QuestionSolvedStatus\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"): (typeof documents)["\n  query ListQuestions($after: Cursor, $where: QuestionWhereInput) {\n    questions(after: $after, first: 10, where: $where) {\n      edges {\n        node {\n          ...QuestionCard\n          ...QuestionSolvedStatus\n          id\n        }\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaterialsSchemaCard on Database {\n    id\n    description\n    slug\n  }\n"): (typeof documents)["\n  fragment MaterialsSchemaCard on Database {\n    id\n    description\n    slug\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n"): (typeof documents)["\n  query MaterialsSchemaContent($id: ID!) {\n    database(id: $id) {\n      id\n      schema\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MaterialsSchema {\n    databases {\n      ...MaterialsSchemaCard\n      id\n    }\n  }\n"): (typeof documents)["\n  query MaterialsSchema {\n    databases {\n      ...MaterialsSchemaCard\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompletedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n      first: 10\n    ) {\n      edges {\n        score\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query CompletedQuestionRanking($period: RankingPeriod!) {\n    ranking(\n      filter: { order: DESC, by: COMPLETED_QUESTIONS, period: $period }\n      first: 10\n    ) {\n      edges {\n        score\n        node {\n          id\n          name\n          submissionStatistics {\n            solvedQuestions\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(filter: { order: DESC, by: POINTS, period: $period }, first: 10) {\n      edges {\n        score\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query PointsRanking($period: RankingPeriod!) {\n    ranking(filter: { order: DESC, by: POINTS, period: $period }, first: 10) {\n      edges {\n        score\n        node {\n          id\n          name\n          totalPoints\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            ...PointHistoryLine\n            id\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query Points {\n    me {\n      id\n      totalPoints\n\n      points(first: 5, orderBy: { field: GRANTED_AT, direction: DESC }) {\n        edges {\n          node {\n            ...PointHistoryLine\n            id\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PointHistoryLine on Point {\n    id\n    description\n    points\n  }\n"): (typeof documents)["\n  fragment PointHistoryLine on Point {\n    id\n    description\n    points\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n"): (typeof documents)["\n  query ResolvedQuestions {\n    me {\n      id\n      submissionStatistics {\n        solvedQuestions\n        totalQuestions\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionForPrompt\n    }\n  }\n"): (typeof documents)["\n  query QuestionInfo($id: ID!) {\n    question(id: $id) {\n      ...QuestionForPrompt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionForPrompt on Question {\n    id\n    category\n    description\n    difficulty\n    title\n  }\n"): (typeof documents)["\n  fragment QuestionForPrompt on Question {\n    id\n    category\n    description\n    difficulty\n    title\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"): (typeof documents)["\n  query CorrectAnswer($id: ID!) {\n    question(id: $id) {\n      id\n      referenceAnswerResult {\n        columns\n        rows\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        submittedCode\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserAnswerResult($id: ID!) {\n    question(id: $id) {\n      id\n      lastSubmission {\n        id\n        error\n        status\n        submittedCode\n        queryResult {\n          columns\n          rows\n        }\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }"): (typeof documents)["\n  query QuestionSchema($id: ID!) {\n    question(id: $id) {\n      id\n      database {\n        id\n        structure {\n          tables {\n            columns\n            name\n          }\n        }\n      }\n    }\n  }"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment QuestionCard on Question {\n    ...QuestionSolvedStatus\n    id\n    category\n    description\n    difficulty\n\n    title\n\n    statistics {\n      attemptedUsers\n      passedUsers\n    }\n  }\n"): (typeof documents)["\n  fragment QuestionCard on Question {\n    ...QuestionSolvedStatus\n    id\n    category\n    description\n    difficulty\n\n    title\n\n    statistics {\n      attemptedUsers\n      passedUsers\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    fragment QuestionSolvedStatus on Question {\n        id\n        attempted\n        solved\n    }\n"): (typeof documents)["\n    fragment QuestionSolvedStatus on Question {\n        id\n        attempted\n        solved\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicUserInfo {\n    me {\n      id\n      avatar\n      email\n      name\n\n      group {\n        id\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;