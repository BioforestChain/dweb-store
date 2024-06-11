export type AppInfo = {
    name: string;
    logo: string;
    description: string;
    metadata?: string;
    latest?: string;
    website?: string; // 官网
    tracker?: string;
    community?: string;
    [key: string]: string | undefined; // 索引签名
}

export type BaseConfig = {
    base_url: string;
    assets_path: string;
    app_test_path?: string;
    app_prod_path?: string;
}

type AppList = {
    [appName: string]: AppInfo;
}

export type ProductSetByType = {
    category: string,
    name: string,
    icon: string,
    themeColor: string,
    applist: AppInfo[]
}

export type ConfigData = {
    base_config: BaseConfig;
    applist: AppList;
    all_products?: ProductSetByType[];
} 