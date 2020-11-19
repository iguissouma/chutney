import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  RestFunction: any;
  RestFunctionOrString: any;
};






export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  mail: Scalars['String'];
};

export type ScenarioExecution = {
  __typename?: 'ScenarioExecution';
  executionId: Scalars['ID'];
  time: Scalars['String'];
  duration: Scalars['Int'];
  status?: Maybe<Scalars['String']>;
  info?: Maybe<Scalars['String']>;
  error?: Maybe<Scalars['String']>;
  testCaseTitle: Scalars['String'];
  environment: Scalars['String'];
  report?: Maybe<Scalars['String']>;
};

export type Scenario = {
  __typename?: 'Scenario';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  status: Scalars['String'];
  executions?: Maybe<Array<Maybe<ScenarioExecution>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  creationDate?: Maybe<Scalars['String']>;
  executionDate?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['String']>;
};

export type ScenariosFilter = {
  __typename?: 'ScenariosFilter';
  text?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Scalars['String']>>;
  date?: Maybe<Scalars['String']>;
  advanced?: Maybe<Scalars['Boolean']>;
};

export type Campaign = {
  __typename?: 'Campaign';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
};

export type ExecutionSummary = {
  __typename?: 'ExecutionSummary';
  time: Scalars['String'];
  duration: Scalars['Int'];
  status: Scalars['String'];
  info: Scalars['String'];
  error: Scalars['String'];
  testCaseTitle: Scalars['String'];
  environment: Scalars['String'];
  datasetId: Scalars['String'];
  datasetVersion: Scalars['String'];
  user: Scalars['String'];
};

export type ScenarioExecutionReportOutline = {
  __typename?: 'ScenarioExecutionReportOutline';
  scenarioId: Scalars['String'];
  scenarioName: Scalars['String'];
  execution: ExecutionSummary;
};

export type CampaignExecutionReport = {
  __typename?: 'CampaignExecutionReport';
  executionId: Scalars['ID'];
  campaignName: Scalars['String'];
  startDate: Scalars['String'];
  status: Scalars['String'];
  scenarioExecutionReports: Array<Maybe<ScenarioExecutionReportOutline>>;
  partialExecution: Scalars['Boolean'];
  executionEnvironment: Scalars['String'];
  userId: Scalars['String'];
};

export type CampaignDetails = {
  __typename?: 'CampaignDetails';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  scheduleTime: Scalars['String'];
  environment: Scalars['String'];
  parallelRun: Scalars['Boolean'];
  retryAuto: Scalars['Boolean'];
  datasetId: Scalars['String'];
  scenarioIds: Array<Maybe<Scalars['String']>>;
  campaignExecutionReports: Array<Maybe<CampaignExecutionReport>>;
};

export type CampaignsLastExecution = {
  __typename?: 'CampaignsLastExecution';
  executionId: Scalars['ID'];
  campaignName: Scalars['String'];
  startDate: Scalars['String'];
  status: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  scenarios?: Maybe<Array<Maybe<Scenario>>>;
  scenariosFilter?: Maybe<ScenariosFilter>;
  scenario?: Maybe<Scenario>;
  runScenarioHistory: ScenarioExecution;
  campaigns?: Maybe<Array<Maybe<Campaign>>>;
  campaignsLastExecutions?: Maybe<Array<Maybe<CampaignsLastExecution>>>;
  campaign?: Maybe<CampaignDetails>;
};


export type QueryScenarioArgs = {
  scenarioId: Scalars['ID'];
};


export type QueryRunScenarioHistoryArgs = {
  scenarioId: Scalars['ID'];
  executionId: Scalars['ID'];
};


export type QueryCampaignArgs = {
  campaignId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<User>;
  deleteScenario?: Maybe<Scalars['Boolean']>;
  runScenario: Scalars['ID'];
  deleteCampaign?: Maybe<Scalars['Boolean']>;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationDeleteScenarioArgs = {
  input: Scalars['ID'];
};


export type MutationRunScenarioArgs = {
  scenarioId: Scalars['ID'];
  dataset?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type MutationDeleteCampaignArgs = {
  input: Scalars['ID'];
};



export type CampaignQueryVariables = Exact<{
  campaignId: Scalars['ID'];
}>;


export type CampaignQuery = (
  { __typename?: 'Query' }
  & { campaign?: Maybe<(
    { __typename?: 'CampaignDetails' }
    & Pick<CampaignDetails, 'id' | 'title' | 'description' | 'scheduleTime' | 'environment' | 'parallelRun' | 'retryAuto' | 'datasetId' | 'scenarioIds'>
    & { campaignExecutionReports: Array<Maybe<(
      { __typename: 'CampaignExecutionReport' }
      & Pick<CampaignExecutionReport, 'executionId' | 'campaignName' | 'startDate' | 'status' | 'partialExecution' | 'executionEnvironment' | 'userId'>
      & { scenarioExecutionReports: Array<Maybe<(
        { __typename: 'ScenarioExecutionReportOutline' }
        & Pick<ScenarioExecutionReportOutline, 'scenarioId' | 'scenarioName'>
        & { execution: (
          { __typename: 'ExecutionSummary' }
          & Pick<ExecutionSummary, 'time' | 'duration' | 'status' | 'info' | 'error' | 'testCaseTitle' | 'environment' | 'datasetId' | 'datasetVersion' | 'user'>
        ) }
      )>> }
    )>> }
  )> }
);

export type CampaignsLastExecutionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CampaignsLastExecutionsQuery = (
  { __typename?: 'Query' }
  & { campaignsLastExecutions?: Maybe<Array<Maybe<(
    { __typename?: 'CampaignsLastExecution' }
    & Pick<CampaignsLastExecution, 'executionId' | 'campaignName' | 'startDate' | 'status'>
  )>>> }
);

export type CampaignsQueryVariables = Exact<{ [key: string]: never; }>;


export type CampaignsQuery = (
  { __typename?: 'Query' }
  & { campaigns?: Maybe<Array<Maybe<(
    { __typename?: 'Campaign' }
    & Pick<Campaign, 'id' | 'title' | 'description'>
  )>>> }
);

export type DeleteCampaignMutationVariables = Exact<{
  input: Scalars['ID'];
}>;


export type DeleteCampaignMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteCampaign'>
);

export type DeleteScenarioMutationVariables = Exact<{
  input: Scalars['ID'];
}>;


export type DeleteScenarioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteScenario'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
  bodySerializer: Scalars['RestFunctionOrString'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'firstname' | 'lastname' | 'mail'>
  )> }
);

export type RunScenarioHistoryQueryVariables = Exact<{
  scenarioId: Scalars['ID'];
  executionId: Scalars['ID'];
}>;


export type RunScenarioHistoryQuery = (
  { __typename?: 'Query' }
  & { runScenarioHistory: (
    { __typename?: 'ScenarioExecution' }
    & Pick<ScenarioExecution, 'executionId' | 'time' | 'duration' | 'status' | 'info' | 'error' | 'testCaseTitle' | 'environment' | 'report'>
  ) }
);

export type RunScenarioMutationVariables = Exact<{
  scenarioId: Scalars['ID'];
  dataset?: Maybe<Array<Maybe<Scalars['String']>>>;
}>;


export type RunScenarioMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'runScenario'>
);

export type ScenarioQueryVariables = Exact<{
  scenarioId: Scalars['ID'];
}>;


export type ScenarioQuery = (
  { __typename?: 'Query' }
  & { scenario?: Maybe<(
    { __typename?: 'Scenario' }
    & Pick<Scenario, 'id' | 'title' | 'description' | 'tags' | 'status' | 'creationDate' | 'executionDate' | 'content'>
  )> }
);

export type ScenariosFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type ScenariosFilterQuery = (
  { __typename?: 'Query' }
  & { scenariosFilter?: Maybe<(
    { __typename?: 'ScenariosFilter' }
    & Pick<ScenariosFilter, 'text' | 'date' | 'tags' | 'advanced'>
  )> }
);

export type ScenariosQueryVariables = Exact<{ [key: string]: never; }>;


export type ScenariosQuery = (
  { __typename?: 'Query' }
  & { scenarios?: Maybe<Array<Maybe<(
    { __typename?: 'Scenario' }
    & Pick<Scenario, 'id' | 'title' | 'tags' | 'creationDate' | 'executionDate' | 'status'>
    & { executions?: Maybe<Array<Maybe<(
      { __typename: 'ScenarioExecution' }
      & Pick<ScenarioExecution, 'executionId' | 'time' | 'status' | 'duration'>
    )>>> }
  )>>> }
);

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = (
  { __typename?: 'Query' }
  & { user?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'firstname' | 'lastname' | 'mail'>
  )> }
);

export const CampaignDocument = gql`
    query campaign($campaignId: ID!) {
  campaign(campaignId: $campaignId) @rest(type: "CampaignDetails", path: "api/ui/campaign/v1/{args.campaignId}") {
    id
    title
    description
    scheduleTime
    environment
    parallelRun
    retryAuto
    datasetId
    scenarioIds
    campaignExecutionReports @type(name: "CampaignExecutionReport") {
      __typename
      executionId
      campaignName
      startDate
      status
      partialExecution
      executionEnvironment
      userId
      scenarioExecutionReports @type(name: "ScenarioExecutionReportOutline") {
        __typename
        scenarioId
        scenarioName
        execution @type(name: "ExecutionSummary") {
          __typename
          time
          duration
          status
          info
          error
          testCaseTitle
          environment
          datasetId
          datasetVersion
          user
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CampaignGQL extends Apollo.Query<CampaignQuery, CampaignQueryVariables> {
    document = CampaignDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CampaignsLastExecutionsDocument = gql`
    query campaignsLastExecutions {
  campaignsLastExecutions @rest(type: "CampaignsLastExecution", path: "api/ui/campaign/v1/lastexecutions/10") {
    executionId
    campaignName
    startDate
    status
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CampaignsLastExecutionsGQL extends Apollo.Query<CampaignsLastExecutionsQuery, CampaignsLastExecutionsQueryVariables> {
    document = CampaignsLastExecutionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CampaignsDocument = gql`
    query campaigns {
  campaigns @rest(type: "Campaign", path: "api/ui/campaign/v1") {
    id
    title
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CampaignsGQL extends Apollo.Query<CampaignsQuery, CampaignsQueryVariables> {
    document = CampaignsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteCampaignDocument = gql`
    mutation deleteCampaign($input: ID!) {
  deleteCampaign(input: $input) @rest(type: "CampaignDeleted", path: "api/ui/campaign/v1/{args.input}", method: "DELETE")
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteCampaignGQL extends Apollo.Mutation<DeleteCampaignMutation, DeleteCampaignMutationVariables> {
    document = DeleteCampaignDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteScenarioDocument = gql`
    mutation deleteScenario($input: ID!) {
  deleteScenario(input: $input) @rest(type: "ScenarioDeleted", path: "api/scenario/v2/{args.input}", method: "DELETE")
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteScenarioGQL extends Apollo.Mutation<DeleteScenarioMutation, DeleteScenarioMutationVariables> {
    document = DeleteScenarioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const LoginDocument = gql`
    mutation login($input: LoginInput!, $bodySerializer: RestFunctionOrString!) {
  login(input: $input) @rest(type: "User", path: "api/v1/user/login", method: "POST", bodySerializer: $bodySerializer) {
    id
    name
    firstname
    lastname
    mail
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class LoginGQL extends Apollo.Mutation<LoginMutation, LoginMutationVariables> {
    document = LoginDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RunScenarioHistoryDocument = gql`
    query runScenarioHistory($scenarioId: ID!, $executionId: ID!) {
  runScenarioHistory(scenarioId: $scenarioId, executionId: $executionId) @rest(type: "ScenarioExecution", path: "api/ui/scenario/{args.scenarioId}/execution/{args.executionId}/v1") {
    executionId
    time
    duration
    status
    info
    error
    testCaseTitle
    environment
    report
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RunScenarioHistoryGQL extends Apollo.Query<RunScenarioHistoryQuery, RunScenarioHistoryQueryVariables> {
    document = RunScenarioHistoryDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const RunScenarioDocument = gql`
    mutation runScenario($scenarioId: ID!, $dataset: [String]) {
  runScenario(scenarioId: $scenarioId, dataset: $dataset) @rest(type: "SceanrioExecution", path: "api/ui/scenario/executionasync/v1/{args.scenarioId}/GLOBAL", method: "POST", bodyKey: "dataset")
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class RunScenarioGQL extends Apollo.Mutation<RunScenarioMutation, RunScenarioMutationVariables> {
    document = RunScenarioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScenarioDocument = gql`
    query scenario($scenarioId: ID!) {
  scenario(scenarioId: $scenarioId) @rest(type: "Scenario", path: "api/scenario/v2/raw/{args.scenarioId}") {
    id
    title
    description
    tags
    status
    creationDate
    executionDate
    content
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScenarioGQL extends Apollo.Query<ScenarioQuery, ScenarioQueryVariables> {
    document = ScenarioDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScenariosFilterDocument = gql`
    query scenariosFilter {
  scenariosFilter @client {
    text
    date
    tags
    advanced
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScenariosFilterGQL extends Apollo.Query<ScenariosFilterQuery, ScenariosFilterQueryVariables> {
    document = ScenariosFilterDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ScenariosDocument = gql`
    query scenarios {
  scenarios @rest(type: "Scenario", path: "api/scenario/v2") {
    id
    title
    tags
    executions @type(name: "ScenarioExecution") {
      __typename
      executionId
      time
      status
      duration
    }
    creationDate
    executionDate
    status @client
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ScenariosGQL extends Apollo.Query<ScenariosQuery, ScenariosQueryVariables> {
    document = ScenariosDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UserDocument = gql`
    query user {
  user @client {
    id
    name
    firstname
    lastname
    mail
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class UserGQL extends Apollo.Query<UserQuery, UserQueryVariables> {
    document = UserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }