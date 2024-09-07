export default interface HeroSectionInterface {
    name: string;
    descriptions: string[];
    cvLink: string;
    socialLinks: {
        id: "facebook" | "twitter" | "instagram" | "linkedin" | "github";
        url: string;
    }[];
}