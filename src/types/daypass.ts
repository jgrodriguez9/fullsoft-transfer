export interface DayPassQueryDTO {
    page: number;
    limit: number;
    city: string;
    //pax: number;
    sort?: string;
    date: string;
}

export interface HotelDTO {
    _id: string;
    name: string;
    description: string;
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        coordinates: {
            lat: number | null;
            lng: number | null;
        };
    };
    amenities: string[];
    image: {
        publicUrl: string;
        publicId: string;
    };
    images: {
        _id: string;
        publicUrl: string;
        publicId: string;
    }[];
    contact: {
        phone: string;
        email: string;
        website: string;
    };
    cancellationPolicy: {
        description: string;
        freeCancellationUntil?: number;
        penaltyAfter?: number;
        noShowPenalty?: number;
    };
    active: boolean;
    onlyAdults: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    rates: HotelRate[];
}

export interface HotelRate {
    _id: string;
    date: string; // e.g. "2025-01-20"
    currency: string; // e.g. "MXN"
    prices: {
        adult: number;
        child?: number;
        infant?: number;
    };
}
