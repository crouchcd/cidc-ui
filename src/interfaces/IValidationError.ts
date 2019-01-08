export type RawOrParse = "RAW" | "PARSE";
export type Severity = "WARNING" | "CRITICAL";

export interface IValidationError {
    affected_paths: string[];
    explanation: string;
    raw_or_parse: RawOrParse
    severity: Severity;
}
