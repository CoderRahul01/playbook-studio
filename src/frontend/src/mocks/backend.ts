import type { backendInterface, Playbook, PlaybookId, ExternalBlob, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillResult } from "../backend";

const makeBlob = (): ExternalBlob => ({
  getBytes: async () => new Uint8Array(),
  getDirectURL: () => "https://placehold.co/800x500/1a2535/20c997?text=App+Screenshot",
  withUploadProgress: function() { return this; },
} as unknown as ExternalBlob);

const sampleSteps = [
  {
    stepNumber: BigInt(1),
    actionLabel: "Open Repository Settings",
    icon: "settings",
    description: "Navigate to your Lovable project and click the Settings icon in the top-right toolbar to open project configuration.",
    uiElement: "Settings gear icon — top-right corner",
  },
  {
    stepNumber: BigInt(2),
    actionLabel: "Connect GitHub Account",
    icon: "github",
    description: "In the settings panel, find the 'GitHub Integration' section and click 'Connect GitHub' to authorize Lovable access.",
    uiElement: "Connect GitHub button — GitHub Integration section",
  },
  {
    stepNumber: BigInt(3),
    actionLabel: "Select or Create Repository",
    icon: "folder",
    description: "Choose an existing GitHub repository from the dropdown, or enter a new repo name and click 'Create Repository'.",
    uiElement: "Repository dropdown / New repo name input",
  },
  {
    stepNumber: BigInt(4),
    actionLabel: "Push to GitHub",
    icon: "upload",
    description: "Click the 'Push to GitHub' button to sync your Lovable project to the selected repository. A success banner will confirm.",
    uiElement: "Push to GitHub button — bottom of GitHub Integration section",
  },
];

const samplePlaybooks: Playbook[] = [
  {
    id: BigInt(1),
    title: "Push Lovable Project to GitHub",
    taskGoal: "Connect and push a Lovable project to a GitHub repository",
    steps: sampleSteps,
    screenshot: makeBlob(),
    platformName: "Lovable",
    createdAt: BigInt(Date.now() * 1_000_000),
  },
  {
    id: BigInt(2),
    title: "Create a New GitHub Issue",
    taskGoal: "Log a bug or feature request as a GitHub issue",
    steps: [
      {
        stepNumber: BigInt(1),
        actionLabel: "Go to Issues Tab",
        icon: "list",
        description: "Open your GitHub repository and click the 'Issues' tab in the top navigation.",
        uiElement: "Issues tab — top navigation bar",
      },
      {
        stepNumber: BigInt(2),
        actionLabel: "Click New Issue",
        icon: "plus",
        description: "Click the green 'New issue' button on the top-right of the Issues page.",
        uiElement: "New issue button — top-right",
      },
      {
        stepNumber: BigInt(3),
        actionLabel: "Fill in Title and Description",
        icon: "edit",
        description: "Enter a clear title and detailed description for your issue. Add labels or assignees if needed.",
        uiElement: "Title input and description textarea",
      },
      {
        stepNumber: BigInt(4),
        actionLabel: "Submit Issue",
        icon: "send",
        description: "Click 'Submit new issue' to publish your issue to the repository.",
        uiElement: "Submit new issue button — bottom-right",
      },
    ],
    screenshot: makeBlob(),
    platformName: "GitHub",
    createdAt: BigInt((Date.now() - 86400000) * 1_000_000),
  },
];

export const mockBackend: backendInterface = {
  _immutableObjectStorageBlobsAreLive: async (_hashes) => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs) => {},
  _immutableObjectStorageCreateCertificate: async (_blobHash): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info): Promise<_ImmutableObjectStorageRefillResult> => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => {},
  createPlaybook: async (_req) => BigInt(3),
  detectPlatform: async (_screenshot) => "Lovable",
  generatePlaybook: async (_screenshot, _taskGoal, _platformName) => BigInt(1),
  getPlaybook: async (id) => samplePlaybooks.find((p) => p.id === id) ?? null,
  listPlaybooks: async () => samplePlaybooks,
  transform: async (input) => ({
    status: BigInt(200),
    body: new Uint8Array(),
    headers: [],
  }),
};
