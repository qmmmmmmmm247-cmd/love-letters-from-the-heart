
-- Wishes wall (جدار الأمنيات)
CREATE TABLE public.wishes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL DEFAULT 'حبيبي',
  content TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'rose',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.wishes TO anon, authenticated;
GRANT ALL ON public.wishes TO service_role;
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read wishes" ON public.wishes FOR SELECT USING (true);
CREATE POLICY "anyone can add wishes" ON public.wishes FOR INSERT WITH CHECK (true);

-- Time capsules (الكبسولات الزمنية)
CREATE TABLE public.time_capsules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  unlock_at TIMESTAMPTZ NOT NULL,
  author TEXT NOT NULL DEFAULT 'حبيبي',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.time_capsules TO anon, authenticated;
GRANT ALL ON public.time_capsules TO service_role;
ALTER TABLE public.time_capsules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read capsules" ON public.time_capsules FOR SELECT USING (true);
CREATE POLICY "anyone can add capsules" ON public.time_capsules FOR INSERT WITH CHECK (true);

-- Drawings (رسوم حية)
CREATE TABLE public.drawings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL DEFAULT 'حبيبي',
  image_data TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.drawings TO anon, authenticated;
GRANT ALL ON public.drawings TO service_role;
ALTER TABLE public.drawings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read drawings" ON public.drawings FOR SELECT USING (true);
CREATE POLICY "anyone can add drawings" ON public.drawings FOR INSERT WITH CHECK (true);

-- Voice messages (رسائل صوتية)
CREATE TABLE public.voice_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL DEFAULT 'حبيبي',
  audio_data TEXT NOT NULL,
  title TEXT,
  duration_sec INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.voice_messages TO anon, authenticated;
GRANT ALL ON public.voice_messages TO service_role;
ALTER TABLE public.voice_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone can read voices" ON public.voice_messages FOR SELECT USING (true);
CREATE POLICY "anyone can add voices" ON public.voice_messages FOR INSERT WITH CHECK (true);
