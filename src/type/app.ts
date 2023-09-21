export interface appInfo {
    name: string;
    logo: string;
    description: string;
    status: 'installed' | 'not_installed' | 'installing';
    metadata_url: string;
}