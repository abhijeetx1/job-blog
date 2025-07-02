
-- Update a user's role to admin in the profiles table
-- Replace 'USER_EMAIL_HERE' with the actual email address of the user you want to make admin
UPDATE public.profiles 
SET role = 'admin' 
WHERE id = (
  SELECT id 
  FROM auth.users 
  WHERE email = 'USER_EMAIL_HERE'
);
