export interface ServiceInterface {
    id: string;
    title: string;
    description: string;
    techStack: string[];
}

export interface ServicesSectionInterface {
    title: string;
    description: string;
    services: ServiceInterface[];
}