from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = 'Metrology Compliance Platform'
    demo_mode: bool = True
    database_url: str = 'postgresql://postgres:postgres@localhost:5432/metrology'
    vite_supabase_url: str = ''
    vite_supabase_anon_key: str = ''
    supabase_service_role_key: str = ''
    google_api_key: str = ''
    openai_api_key: str = ''
    environment: str = 'development'

    class Config:
        env_file = '.env'
        extra = 'ignore'


settings = Settings()
