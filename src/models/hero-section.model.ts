export default interface HeroSectionInterface {
    name: string;
    descriptions: string[];
    cvLink: string;
    socialLinks: {
        icon: "facebook" | "twitter" | "instagram" | "linkedin" | "github";
        url: string;
    }[];
}