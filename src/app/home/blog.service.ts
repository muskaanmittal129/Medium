
import { Blog } from './blog.model';


export class BlogService{
    
     
   private blogs: Blog[] = [
        new Blog('My White Boss Talked About Race in America and This is What Happened' , 
        'I have never felt so Black at work I have never felt so Black at work I have never felt so Black at work',
         'https://miro.medium.com/max/1500/1*gCq2gxPSq9I21saGVTyS-g.jpeg',
         'I have never felt so Black at work ',
        
         'Mandela SH Jackson', 
         'few hours ago',
        ),


        new Blog('The richest American family hired terrorists to shoot machine guns at sleeping women and children' , 
        'I have never felt so Black at work',
         'https://miro.medium.com/focal/7360/4912/45/54/0*Yr-mjmrxmD0QyADD',
         'I have never felt so Black at work',
         
         'Mandela SH Jackson',
         'Jan 7, 2017',
        ),

        new Blog('The “Other Side” Is Not Dumb' , 
        'I have never felt so Black at work',
         'https://miro.medium.com/max/600/1*P4eh08ddGc_lP8ip0nMpUA.jpeg',
         'I have never felt so Black at work',
         
         'Mandela SH Jackson',
         'Jan 7, 2017',
        ),
         
         
        
        
    
    ];

    constructor(){}
     
getBlogs(){
    return this.blogs.slice(); 
}

getBlogOfIndex(index:number){
    return this.blogs[index];
}

}