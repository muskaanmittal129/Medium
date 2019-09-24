
import { Blog } from './blog.model';
import { Subject } from 'rxjs';


export class BlogService{
    blogChanged = new Subject<Blog[]>();
    blogID:number;

    
     
   private blogs: Blog[]; 
   users:string;
//    = [
        // new Blog('My White Boss Talked About Race in America and This is What Happened' , 
        // 'I have never felt so Black at work I have never felt so Black at work I have never felt so Black at work',
        //  'https://miro.medium.com/max/1500/1*gCq2gxPSq9I21saGVTyS-g.jpeg',
        //  `I have never felt so Black at work.When white people hear the words privilege or privileged they almost always react negatively to the implication that they have not earned what they have or where they are in life.
        //  In a highly meritocratic society ‘privileged’ can only be taken as an insult meaning that you didn’t work hard. That you’re spoiled. Yet we have no objection to the term “underprivileged”. We use it…When white people hear the words privilege or privileged they almost always react negatively to the implication that they have not earned what they have or where they are in life.
        //  In a highly meritocratic society ‘privileged’ can only be taken as an insult meaning that you didn’t work hard. That you’re spoiled. Yet we have no objection to the term “underprivileged”. We use it…
        //  When white people hear the words privilege or privileged they almost always react negatively to the implication that they have not earned what they have or where they are in life.
        //  In a highly meritocratic society ‘privileged’ can only be taken as an insult meaning that you didn’t work hard. That you’re spoiled. Yet we have no objection to the term “underprivileged”. We use it…
        //  When white people hear the words privilege or privileged they almost always react negatively to the implication that they have not earned what they have or where they are in life.
        //  In a highly meritocratic society ‘privileged’ can only be taken as an insult meaning that you didn’t work hard. That you’re spoiled. Yet we have no objection to the term “underprivileged”. We use it…
                           
        //   `,
        
        //  'Mandela SH Jackson', 
        //  'few hours ago',
        //  'Technology'
        // ),


        // new Blog('The richest American family hired terrorists to shoot machine guns at sleeping women and children' , 
        // 'I have never felt so Black at work',
        //  'https://miro.medium.com/focal/7360/4912/45/54/0*Yr-mjmrxmD0QyADD',
        //  'I have never felt so Black at work',
         
        //  'Mandela SH Jackson',
        //  'Jan 7, 2017',
        //  'Current Affairs'
        // ),

        // new Blog('The “Other Side” Is Not Dumb' , 
        // 'I have never felt so Black at work',
        //  'https://miro.medium.com/max/600/1*P4eh08ddGc_lP8ip0nMpUA.jpeg',
        //  'I have never felt so Black at work',
         
        //  'Mandela SH Jackson',
        //  'Jan 7, 2017',
        //  'Creativity'
        // ),

        // new Blog('The “Other Side” Is Not Dumb' , 
        // 'I have never felt so Black at work',
        //  'https://miro.medium.com/max/600/1*P4eh08ddGc_lP8ip0nMpUA.jpeg',
        //  'I have never felt so Black at work',
         
        //  'Mandela SH Jackson',
        //  'Jan 7, 2017',
        //  'Health'
        // ),


        // new Blog('The richest American family hired terrorists to shoot machine guns at sleeping women and children' , 
        // 'I have never felt so Black at work',
        //  'https://miro.medium.com/focal/7360/4912/45/54/0*Yr-mjmrxmD0QyADD',
        //  'I have never felt so Black at work',
         
        //  'Mandela SH Jackson',
        //  'Jan 7, 2017',
        //  'Current Affairs'
        // ),

         
         
         
        
        
    
    // ];

    constructor(){}
     
getBlogs(){
    return this.blogs.slice(); 
}

getBlogOfIndex(index:number){
    return this.blogs[index];
}

setBlog(blog:Blog[]){
    console.log(blog);
    this.blogs = blog;
    this.blogChanged.next(this.blogs);
}

setUsername(user:string){
    console.log(user);
    this.users = user;
    console.log(this.users);}
    
    
    // this.blogs = blog;
    // this.blogChanged.next(this.blogs);

    getBlogId(id:number){
        this.blogID = id;

    }

    
}




