const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    })
}, {})

const files = document.querySelectorAll('.folder');
files.forEach((el) => observer.observe(el));