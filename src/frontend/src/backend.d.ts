import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface CreatePlaybookRequest {
    title: string;
    taskGoal: string;
    steps: Array<Step>;
    screenshot: ExternalBlob;
    platformName: string;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface Step {
    actionLabel: string;
    icon: string;
    description: string;
    stepNumber: bigint;
    uiElement?: string;
}
export type PlaybookId = bigint;
export interface Playbook {
    id: PlaybookId;
    title: string;
    createdAt: Timestamp;
    taskGoal: string;
    steps: Array<Step>;
    screenshot: ExternalBlob;
    platformName: string;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface backendInterface {
    createPlaybook(req: CreatePlaybookRequest): Promise<PlaybookId>;
    detectPlatform(screenshot: ExternalBlob): Promise<string>;
    generatePlaybook(screenshot: ExternalBlob, taskGoal: string, platformName: string): Promise<PlaybookId>;
    getPlaybook(id: PlaybookId): Promise<Playbook | null>;
    listPlaybooks(): Promise<Array<Playbook>>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
}
