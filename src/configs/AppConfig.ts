export default class AppConfig
{
    public static PORT:number               = 3000;
    public static DB_CLIENT:string          = 'mysql';
    public static DB_HOST:string            = '192.168.0.33';
	public static DB_USER:string            = 'root';
    public static DB_PWD:string             = '';
    public static DB_NAME:string            = 'funxn_api';
    public static DB_TIMEOUT:number         = 1000 * 60 * 5;
    public static TIME_OFFSET:number        = 0;
    public static API_ROOT:string           = "/api/";
    public static JWT_SECRET:string         = "secret";
}
