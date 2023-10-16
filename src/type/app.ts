export interface AppInfo {
    name: string;
    logo: string;
    description: string;
    metadata: string;
}

interface BaseConfig {
    base_url: string;
    assets_path: string;
    app_test_path: string;
    app_prod_path: string;
}

interface AppList {
    [appName: string]: AppInfo;
}

export interface ConfigData {
    base_config: BaseConfig;
    applist: AppList;
} 