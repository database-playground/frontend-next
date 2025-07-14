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
    "\n  query GroupAuditInfoQuery($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GroupAuditInfoQueryDocument,
    "\n  query GroupHeaderQuery($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": typeof types.GroupHeaderQueryDocument,
    "\n  query GroupMembersQuery($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": typeof types.GroupMembersQueryDocument,
    "\n  query GroupScopesQuery($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSet {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n": typeof types.GroupScopesQueryDocument,
    "\n  mutation CreateGroupMutation($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": typeof types.CreateGroupMutationDocument,
    "\n    query GroupsPageQuery {\n        groups {\n            id\n            name\n            description\n            scopeSet {\n                id\n                slug\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": typeof types.GroupsPageQueryDocument,
    "\n    query ScopeSetListQuery {\n        scopeSets {\n            id\n            slug\n        }\n    }\n": typeof types.ScopeSetListQueryDocument,
    "\n  query GroupsPageQuery {\n    groups {\n      id\n      name\n      description\n      scopeSet {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.GroupsPageQueryDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n": typeof types.MeUserInfoDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": typeof types.MeUpdateUserInfoDocument,
    "\n  query ScopeSetHeaderQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n": typeof types.ScopeSetHeaderQueryDocument,
    "\n  query ScopeSetScopesQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n": typeof types.ScopeSetScopesQueryDocument,
    "\n  query GroupsWithScopeSetQuery {\n    groups {\n      id\n      name\n      scopeSet {\n        id\n      }\n    }\n  }\n": typeof types.GroupsWithScopeSetQueryDocument,
    "\n    mutation CreateScopeSetMutation($input: CreateScopeSetInput!) {\n      createScopeSet(input: $input) {\n        id\n      }\n    }\n": typeof types.CreateScopeSetMutationDocument,
    "\n    mutation UpdateScopeSetMutation($id: ID!, $input: UpdateScopeSetInput!) {\n      updateScopeSet(id: $id, input: $input) {\n        id\n      }\n    }\n": typeof types.UpdateScopeSetMutationDocument,
    "\n    mutation DeleteScopeSetMutation($id: ID!) {\n      deleteScopeSet(id: $id)\n    }\n": typeof types.DeleteScopeSetMutationDocument,
    "\n    query ScopesetPageQuery {\n        scopeSets {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n": typeof types.ScopesetPageQueryDocument,
    "\n    query ScopesetPageQueryById($id: ID!) {\n        scopeSet(filter: { id: $id }) {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n": typeof types.ScopesetPageQueryByIdDocument,
    "\n  query UserHeaderQuery($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": typeof types.UserHeaderQueryDocument,
    "\n  query UserGroupsQuery($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n": typeof types.UserGroupsQueryDocument,
    "\n  query UserAuditInfoQuery($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.UserAuditInfoQueryDocument,
    "\n  query UsersPageQuery(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": typeof types.UsersPageQueryDocument,
    "\n  query SidebarUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": typeof types.SidebarUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n\n      group {\n        name\n      }\n    }\n  }\n": typeof types.BasicUserInfoDocument,
};
const documents: Documents = {
    "\n  query GroupAuditInfoQuery($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": types.GroupAuditInfoQueryDocument,
    "\n  query GroupHeaderQuery($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n": types.GroupHeaderQueryDocument,
    "\n  query GroupMembersQuery($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n": types.GroupMembersQueryDocument,
    "\n  query GroupScopesQuery($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSet {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n": types.GroupScopesQueryDocument,
    "\n  mutation CreateGroupMutation($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n": types.CreateGroupMutationDocument,
    "\n    query GroupsPageQuery {\n        groups {\n            id\n            name\n            description\n            scopeSet {\n                id\n                slug\n            }\n            createdAt\n            updatedAt\n        }\n    }\n": types.GroupsPageQueryDocument,
    "\n    query ScopeSetListQuery {\n        scopeSets {\n            id\n            slug\n        }\n    }\n": types.ScopeSetListQueryDocument,
    "\n  query GroupsPageQuery {\n    groups {\n      id\n      name\n      description\n      scopeSet {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n": types.GroupsPageQueryDocument,
    "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n": types.MeUserInfoDocument,
    "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n": types.MeUpdateUserInfoDocument,
    "\n  query ScopeSetHeaderQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n": types.ScopeSetHeaderQueryDocument,
    "\n  query ScopeSetScopesQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n": types.ScopeSetScopesQueryDocument,
    "\n  query GroupsWithScopeSetQuery {\n    groups {\n      id\n      name\n      scopeSet {\n        id\n      }\n    }\n  }\n": types.GroupsWithScopeSetQueryDocument,
    "\n    mutation CreateScopeSetMutation($input: CreateScopeSetInput!) {\n      createScopeSet(input: $input) {\n        id\n      }\n    }\n": types.CreateScopeSetMutationDocument,
    "\n    mutation UpdateScopeSetMutation($id: ID!, $input: UpdateScopeSetInput!) {\n      updateScopeSet(id: $id, input: $input) {\n        id\n      }\n    }\n": types.UpdateScopeSetMutationDocument,
    "\n    mutation DeleteScopeSetMutation($id: ID!) {\n      deleteScopeSet(id: $id)\n    }\n": types.DeleteScopeSetMutationDocument,
    "\n    query ScopesetPageQuery {\n        scopeSets {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n": types.ScopesetPageQueryDocument,
    "\n    query ScopesetPageQueryById($id: ID!) {\n        scopeSet(filter: { id: $id }) {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n": types.ScopesetPageQueryByIdDocument,
    "\n  query UserHeaderQuery($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": types.UserHeaderQueryDocument,
    "\n  query UserGroupsQuery($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n": types.UserGroupsQueryDocument,
    "\n  query UserAuditInfoQuery($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n": types.UserAuditInfoQueryDocument,
    "\n  query UsersPageQuery(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n": types.UsersPageQueryDocument,
    "\n  query SidebarUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n    }\n  }\n": types.SidebarUserInfoDocument,
    "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n\n      group {\n        name\n      }\n    }\n  }\n": types.BasicUserInfoDocument,
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
export function graphql(source: "\n  query GroupAuditInfoQuery($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GroupAuditInfoQuery($id: ID!) {\n    group(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupHeaderQuery($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"): (typeof documents)["\n  query GroupHeaderQuery($id: ID!) {\n    group(id: $id) {\n      id\n      name\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupMembersQuery($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n"): (typeof documents)["\n  query GroupMembersQuery($id: ID!) {\n    users(where: { hasGroupWith: { id: $id } }) {\n      totalCount\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupScopesQuery($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSet {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupScopesQuery($id: ID!) {\n    group(id: $id) {\n      id\n      scopeSet {\n        id\n        slug\n        scopes\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGroupMutation($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateGroupMutation($input: CreateGroupInput!) {\n    createGroup(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query GroupsPageQuery {\n        groups {\n            id\n            name\n            description\n            scopeSet {\n                id\n                slug\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"): (typeof documents)["\n    query GroupsPageQuery {\n        groups {\n            id\n            name\n            description\n            scopeSet {\n                id\n                slug\n            }\n            createdAt\n            updatedAt\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ScopeSetListQuery {\n        scopeSets {\n            id\n            slug\n        }\n    }\n"): (typeof documents)["\n    query ScopeSetListQuery {\n        scopeSets {\n            id\n            slug\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupsPageQuery {\n    groups {\n      id\n      name\n      description\n      scopeSet {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query GroupsPageQuery {\n    groups {\n      id\n      name\n      description\n      scopeSet {\n        id\n        slug\n      }\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query MeUserInfo {\n    me {\n      id\n      name\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation MeUpdateUserInfo($input: UpdateUserInput!) {\n    updateMe(input: $input) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetHeaderQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetHeaderQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      slug\n      description\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query ScopeSetScopesQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n"): (typeof documents)["\n  query ScopeSetScopesQuery($id: ID!) {\n    scopeSet(filter: { id: $id }) {\n      id\n      scopes\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GroupsWithScopeSetQuery {\n    groups {\n      id\n      name\n      scopeSet {\n        id\n      }\n    }\n  }\n"): (typeof documents)["\n  query GroupsWithScopeSetQuery {\n    groups {\n      id\n      name\n      scopeSet {\n        id\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation CreateScopeSetMutation($input: CreateScopeSetInput!) {\n      createScopeSet(input: $input) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation CreateScopeSetMutation($input: CreateScopeSetInput!) {\n      createScopeSet(input: $input) {\n        id\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation UpdateScopeSetMutation($id: ID!, $input: UpdateScopeSetInput!) {\n      updateScopeSet(id: $id, input: $input) {\n        id\n      }\n    }\n"): (typeof documents)["\n    mutation UpdateScopeSetMutation($id: ID!, $input: UpdateScopeSetInput!) {\n      updateScopeSet(id: $id, input: $input) {\n        id\n      }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    mutation DeleteScopeSetMutation($id: ID!) {\n      deleteScopeSet(id: $id)\n    }\n"): (typeof documents)["\n    mutation DeleteScopeSetMutation($id: ID!) {\n      deleteScopeSet(id: $id)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ScopesetPageQuery {\n        scopeSets {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n"): (typeof documents)["\n    query ScopesetPageQuery {\n        scopeSets {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    query ScopesetPageQueryById($id: ID!) {\n        scopeSet(filter: { id: $id }) {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n"): (typeof documents)["\n    query ScopesetPageQueryById($id: ID!) {\n        scopeSet(filter: { id: $id }) {\n            id\n            slug\n            description\n            scopes\n        }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserHeaderQuery($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query UserHeaderQuery($id: ID!) {\n    user(id: $id) {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserGroupsQuery($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query UserGroupsQuery($id: ID!) {\n    user(id: $id) {\n      id\n      group {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UserAuditInfoQuery($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query UserAuditInfoQuery($id: ID!) {\n    user(id: $id) {\n      id\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query UsersPageQuery(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"): (typeof documents)["\n  query UsersPageQuery(\n    $first: Int\n    $after: Cursor\n    $last: Int\n    $before: Cursor\n  ) {\n    users(first: $first, after: $after, last: $last, before: $before) {\n      edges {\n        node {\n          id\n          name\n          email\n          avatar\n          createdAt\n          updatedAt\n          group {\n            id\n            name\n          }\n        }\n      }\n      totalCount\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SidebarUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"): (typeof documents)["\n  query SidebarUserInfo {\n    me {\n      id\n      name\n      email\n      avatar\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n\n      group {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query BasicUserInfo {\n    me {\n      id\n      name\n      email\n\n      group {\n        name\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;