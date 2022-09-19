export interface GooglePlacesResponse {
    data: Data;
}

export interface Data {
    predictions: Prediction[];
    status: string;
}

export interface Prediction {
    description: string;
    matched_substrings: MatchedSubstring[];
    place_id: string;
    reference: string;
    structured_formatting: StructuredFormatting;
    terms: Term[];
    types: string[];
}

export interface MatchedSubstring {
    length: number;
    offset: number;
}

export interface StructuredFormatting {
    main_text: string;
    main_text_matched_substrings: MainTextMatchedSubstring[];
    secondary_text?: string;
}

export interface MainTextMatchedSubstring {
    length: number;
    offset: number;
}

export interface Term {
    offset: number;
    value: string;
}
