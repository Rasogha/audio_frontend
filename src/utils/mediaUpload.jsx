import {createClient} from '@supabase/supabase-js' //connect supabase project to frontend

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWZ5a2NqdmpubmNtbGNhcm93Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg2OTYxMDYsImV4cCI6MjA4NDI3MjEwNn0.K2-Lf5ojtwqUXURY_tRB2DOEUo4a4Z8gy5HFG4t6kS8"
const supabase_url = "https://zlufykcjvjnncmlcarow.supabase.co"

const supabase = createClient(supabase_url, anon_key) //initializing supabase client

export default function mediaUpload(file){
    return new Promise((resolve, reject)=>{
        if(file == null){
            reject("No file provided")
        }
    

        const timestamp = new Date().getTime() //get current time in milliseconds
        const fileName = timestamp+file.name //add timestamp to file name to make it unique

        supabase.storage.from("images").upload(fileName, file, { //bbucket name and file name
            cacheControl: '3600',
            upsert: false,
        }).then(()=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file")
        })
    })
}