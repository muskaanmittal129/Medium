
import { Blog } from './blog.model';


export class BlogService{
    
     
   private blogs: Blog[] = [
        new Blog('A test recipe' , 
        'this is simply a test',
         'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg ',
        ),
         
        new Blog('Delicious!!!' ,
         'this is simply a test',
          'https://www.thecookierookie.com/wp-content/uploads/2019/08/pasta-pomodoro-recipe-3-of-7.jpg ',
        )
        
    
    ];

    constructor(){}
     
getBlogs(){
    return this.blogs.slice(); 
}

getBlogOfIndex(index:number){
    return this.blogs[index];
}

}