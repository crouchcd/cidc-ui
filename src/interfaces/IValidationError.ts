interface IValidationError {
    affected_paths: string[];
    explanation: string;
    raw_or_parse: "RAW" | "PARSE";
    severity: "WARNING" | "CRITICAL";
}

export default IValidationError