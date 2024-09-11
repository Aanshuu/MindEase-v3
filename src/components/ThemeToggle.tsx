import { useEffect, useState } from "react";
import { Sun } from "lucide-react";
import { MoonStar } from "lucide-react";
import { useCurrentUser, pb } from "@/lib/pocketbase";

const ThemeToggle = () => {
  const currentUser = useCurrentUser();
  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   // Check for saved user preference, or default to light theme
  //   const savedTheme = localStorage.getItem('theme') || 'light';
  //   setTheme(savedTheme);
  //   document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  // }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);


  useEffect(() => {
    const fetchUserTheme = async() => {
      if(currentUser){
        try{
          const userData = await pb.collection('users').getOne(currentUser.id);
          const userTheme = userData.theme || 'light';
          if(userTheme !== theme){
            setTheme(userTheme);
            document.documentElement.classList.toggle('dark', userTheme === 'dark');
            localStorage.setItem('theme', userTheme); 
          }
          
        }catch(error){
          console.error(error)
        }
      }
    }
    fetchUserTheme();
  }, [currentUser]);

  const toggleTheme = async() => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme); // Stored

    if(currentUser){
      try{
        await pb.collection('users').update(currentUser.id, {theme: newTheme})
      }catch(error){
        console.error(error)
      }
    }
  };

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  //   localStorage.setItem("theme", newTheme);
  // }

  return (
    <button
      onClick={toggleTheme}
      className="p-1 bg-black dark:bg-white text-white dark:text-black rounded"
    >
      {theme === "light" ? <Sun /> : <MoonStar />}
    </button>
  );
};

export default ThemeToggle;
