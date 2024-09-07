export interface ServiceInterface {
    id: string;
    title: string;
    description: string;
    techStack: string[];
}

export interface ServicesSectionInterface {
    services: ServiceInterface[];
}