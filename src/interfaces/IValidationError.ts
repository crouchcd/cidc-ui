type RawOrParse = "RAW" | "PARSE";
type Severity = "WARNING" | "CRITICAL";

interface IValidationError {
    affected_paths: string[];
    explanation: string;
    raw_or_parse: RawOrParse
    severity: Severity;
}

export { 
    IValidationError,
    RawOrParse,
    Severity
}