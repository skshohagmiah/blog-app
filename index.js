const main = document.querySelector('main');
const blogList = document.querySelector('.blog-list');
const addBlogBtn = document.querySelector('.add-blog');
const blogForm = document.querySelector('.form-container');
const searchForm = document.querySelector('.search-form');


let blogData = [
    {
      id: 1,
      title: "Mastering JavaScript: A Comprehensive Guide",
      author: "John Doe",
      content: "JavaScript is a versatile programming language that has become the cornerstone of modern web development...",
      date: "2023-09-10",
      tags: ["JavaScript", "Programming", "Web Development"],
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    },
    {
      id: 2,
      title: "Deep Dive into React.js Components and State Management",
      author: "Jane Smith",
      content: "React.js is a popular JavaScript library for building user interfaces. In this blog post, we will explore advanced concepts...",
      date: "2023-09-12",
      tags: ["React.js", "Frontend", "Web Development"],
      imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "Building RESTful APIs with Node.js and Express.js",
      author: "Bob Johnson",
      content: "Node.js and Express.js are widely used for building backend servers. In this tutorial, we'll walk through the process of creating a RESTful API...",
      date: "2023-09-15",
      tags: ["Node.js", "Express.js", "Backend", "Web Development"],
      imageUrl: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Creating Stunning Web Designs with Advanced CSS Techniques",
      author: "Alice Brown",
      content: "Learn how to make your websites look great on all devices with CSS. We'll cover advanced CSS techniques such as Flexbox and Grid...",
      date: "2023-09-18",
      tags: ["CSS", "Web Design", "Responsive Design"],
      imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    },
    {
      id: 5,
      title: "Database Fundamentals: A Complete Guide to SQL",
      author: "David Wilson",
      content: "SQL is essential for managing and querying databases. This comprehensive guide covers everything from basic queries to advanced database design...",
      date: "2023-09-20",
      tags: ["SQL", "Databases", "Database Management"],
      imageUrl: "https://plus.unsplash.com/premium_photo-1661386257356-c17257862be8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

const comments = [];


searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    searchBlog()
})

function searchBlog() {
    const search = document.querySelector('.search-input');
    const filteredBlogData = blogData.filter((blog) => {
        return blog.title.toLowerCase().includes(search.value.toLowerCase());
    });
    createBlogs(filteredBlogData)
    search.value = '';
}


function editBlog(){
    const editContainer = document.querySelector('.edit-container');
    const allEditBtns = document.querySelectorAll('.edit-btn');
    const closeUpdate = document.querySelector('.close-update-blog')

    closeUpdate.addEventListener('click', () => editContainer.style.display = 'none');

    allEditBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            editContainer.style.display = 'block'
            const parentDiv = e.target.parentElement.parentElement;
            const updateForm = document.querySelector('.update-form');
            const etitle = document.getElementById('etitle');
            const eauthor = document.getElementById('eauthor');
            const econtent = document.getElementById('econtent')
            const etags = document.getElementById('etags');
            const eimageUrl = document.getElementById('eimageUrl');

            blogData.forEach(item => {
                if(item.id === Number(parentDiv.id)){
                    etitle.value = item.title
                    econtent.value = item.content;
                    eauthor.value = item.author;
                    etags.value = item.tags.join(' ');
                    eimageUrl.value = item.imageUrl
                }
            })
            updateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                blogData.forEach(item => {
                    if(item.id === Number(parentDiv.id)){
                         item.title = etitle.value;
                         item.content = econtent.value ;
                         item.author= eauthor.value;
                         item.tags = etags.value.split(' ');
                         item.imageUrl = eimageUrl.value;
                    }
                })
                createBlogs(blogData)
                editContainer.style.display = 'none'
            })
        })
    })
}


function deleteBlog(){
    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            blogData.forEach(blog => {
                if(e.target.parentElement.parentElement.id == blog.id){
                    e.target.parentElement.parentElement.remove()
                }
            })
        })
    })

}


function addCategoryAndTags(data){
    const allCategory = document.querySelector('.all-categories');
    const categories = data.map((item) => item.tags[0])
    categories.forEach((cate) => {
        const category = document.createElement('li');
        category.classList.add('category');
        category.innerText = cate;
        allCategory.appendChild(category);
    })

    const singleCategory = document.querySelectorAll('.category');
    singleCategory.forEach((categ) => {
        categ.addEventListener('click', (e) => {
            singleCategory.forEach(item => item.classList.remove('active'))
            categ.classList.add('active')
            const filteredData = blogData.filter((blog) => {
                if(blog.tags[0] == e.target.textContent){
                    return blog
                }
            })
            createBlogs(filteredData)
        })
    })

    const tags = data.map((item) => item.tags);
    const allTags = document.querySelector('.all-tags');

    tags.forEach(tag => {
        const ta = document.createElement('li');
        ta.classList.add('tag');
        ta.innerText = tag;
        allTags.appendChild(ta)
    })

    const singletag = document.querySelectorAll('.tag');
    singletag.forEach((tag) => {
        tag.addEventListener('click', (e) => {
            console.log(e.target.textContent)
            singletag.forEach(item => item.classList.remove('active'))
            tag.classList.add('active')
            const filteredData = blogData.filter((blog) => {
                console.log(blog.tags.join(','))
                if(blog.tags.join(',') == e.target.textContent){
                    return blog
                }
            })
            createBlogs(filteredData)
        })
    })

}
addCategoryAndTags(blogData)

function addBlog(){
    const closeBtn = document.querySelector('.close-add-blog')
    addBlogBtn.addEventListener('click', () => {
    blogForm.style.display = 'block';     
    })

    closeBtn.addEventListener('click', () => {
        blogForm.style.display = 'none';     
        })

        const blogContainer = document.querySelector('.add-blog-form');
        const title = document.getElementById('title');
        const author = document.getElementById('author');
        const content = document.getElementById('content')
        const tags = document.getElementById('tags');
        const imageUrl = document.getElementById('imageUrl');


        blogContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(title.value,author.value,tags.value,imageUrl.value)
            blogData.unshift({
                id:Date.now(),
                title:title.value,
                content:content.value,
                date: new Date().toLocaleTimeString(),
                author:author.value,
                tags: tags.value.split(' '),
                imageUrl:imageUrl.value
            })
            createBlogs(blogData)
            blogForm.style.display = 'none'; 

    })
    title.value = '';
    content.value = '';
    author.value = '';
    tags.value = '';
    imageUrl.value = '';

}
addBlog()

function createBlogs(data){
    blogList.innerHTML ='';
    data.forEach((item) => {
        const blog = document.createElement('article');
        blog.classList.add('blog-post');
        blog.setAttribute('id', item.id);
        blog.innerHTML = `
       
      <img
        src="${item.imageUrl}"
        alt="Blog Post 1 Image"
      />
      <h2>${item.title}</h2>
      <p>Published by ${item.author} on ${new Date()}</p>
      <p>
        ${item.content}
        <a class='read-more'>Read More</a>
      </p>
      <div class="red-btns">
      <button class='edit-btn'>Edit</button>
      <button class='delete-btn'>Detete</button>
    </div>
        `
    blogList.appendChild(blog);
});

deleteBlog()
editBlog()
}
createBlogs(blogData)

function mobileNavber(){
    const hambergur = document.querySelector('.hambergur');
    const navber = document.querySelector('.nav-menu ul');
    const line1 = document.querySelector('.line1');
    const line2 = document.querySelector('.line2');
    hambergur.addEventListener('click', () => {
        navber.classList.toggle('show');
        hambergur.classList.toggle('show')
        line1.classList.toggle('show');
        line2.classList.toggle('show');
    })
}

mobileNavber()