const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("lesson-container").classList.add("hidden");
};

const hideLoader = () => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("lesson-container").classList.remove("hidden");
};

function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
      btn.classList.remove("active");
    }
}

document.getElementById("header").style.display="none";
document.getElementById("faq").style.display="none";
document.getElementById("learn").style.display="none";

document.getElementById("submit").addEventListener('click',
    function(event){
        event.preventDefault;
        const name=document.getElementById("name").value;
        const password=document.getElementById("password").value;
        
        if(name===""){
            alert("Please Tell us Your Name First");
        }
        else if(password===""){
            alert("Wrong Password. Contact admin to get your Login Code");
        }
        else if(password!=="123456"){
            alert("Wrong Password. Contact admin to get your Login Code");
        }
        else if(password==="123456"){
            document.getElementById("banner").style.display="none";
            document.getElementById("header").style.display="block";
            document.getElementById("faq").style.display="block";
            document.getElementById("learn").style.display="block";
            alert("Successfully Logged In!");
        }
    }
)

document.getElementById("logout").addEventListener('click',
    function(event){
        event.preventDefault;
        document.getElementById("name").value="";
        document.getElementById("password").value="";
        document.getElementById("banner").style.display="flex";
        document.getElementById("header").style.display="none";
        document.getElementById("faq").style.display="none";
        document.getElementById("learn").style.display="none";
        alert("Successfully Logged Out!");
    }
)

function loadLessonCategories() {
    fetch("https://openapi.programming-hero.com/api/levels/all")
      .then((res) => res.json())
      .then((data) => displayLessonsList(data.data));
}


const loadLessonList = (id) => {
    showLoader();
    const url = `https://openapi.programming-hero.com/api/level/${id}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        removeActiveClass();

        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");

        displayLessons(data.data);
      });
};

const loadLessonDetails = (lessonId) => {
    const url = `https://openapi.programming-hero.com/api/word/${lessonId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => displayLessonDetails(data.data));
  };
  
  const displayLessonDetails = (word) => {
    document.getElementById("lesson-details").showModal();
    const detailsContainer = document.getElementById("details-container");

    let meaning="";
    if(word.meaning!=="" && word.meaning!==null){
        meaning=word.meaning;
    }
    else{
        meaning="অর্থ নেই";
    }

    let sentence="";
    if(word.sentence!=="" && word.sentence!==null){
        sentence=word.sentence;
    }
    else{
        sentence="Not found sentence";
    }

    let synonyms="";

    for (let sym of word.synonyms){
        if(sym!=="" && sym!==null){
            synonyms+="<span class='bg-[#EDF7FF] rounded-sm mr-[10px] p-[10px]'>" + sym + "</span>";
        }
    }

    if(synonyms==="" || synonyms===null){
        synonyms="সমার্থক শব্দ পাওয়া যায়নি";
    }
  
    detailsContainer.innerHTML = `
        <div class="card border-[#EDF7FF] rounded-sm border-2">
            <div class="card-body">
            <h2 class="card-title font-semibold text-xl lg:text-2xl leading-[40px]">${word.word} (<img src="../assets/mic.png" class="w-[20px]"> ${word.pronunciation})</h2>
            <h6 class="card-title font-semibold text-base lg:text-xl mt-[10px]">Meaning</h6>
            <p class="card-title text-base lg:text-xl">${meaning}</p>
            <h6 class="text-base font-medium lg:text-lg mt-[10px]">Example</h6>
            <p class="text-base lg:text-lg">${sentence}</p>
            <h6 class="font-medium text-base lg:text-xl mt-[10px]">সমার্থক শব্দ গুলো</h6>
            <p class="pt-[5px]">${synonyms}</p>
            </div>
        </div>
    `;
  };

function displayLessonsList(lessons) {
    const categoryContainer = document.getElementById("lessoncat-container");
  
    for (let cat of lessons) {
      const categoryDiv = document.createElement("div");
  
      categoryDiv.innerHTML = `
      <button id="btn-${cat.level_no}"  onclick="loadLessonList(${cat.level_no})" class="btn border-[#422AD5] rounded-[4px] text-[#422AD5] hover:bg-[#422AD5]  hover:text-white mx-[10px] lesson-img"><img src="../assets/fa-book-open.png"> Lesson ${cat.level_no}</button>
      `;
  
      categoryContainer.append(categoryDiv);
    }
}

const displayLessons = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");

    lessonContainer.innerHTML = "";

    if (lessons.length == 0) {
        lessonContainer.innerHTML = `
        <div
            class="py-20 col-span-full flex flex-col justify-center items-center text-center"
            >
            <img class="w-[150px]" src="./assets/alert-error.png" alt="" />
            <h2 class="text-xl lg:text-3xl font-medium">No Word Found</h2>
            <h6 class="text-[#79716B] text-lg lg:text-base">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h6>
            <h2 class="text-xl lg:text-3xl font-medium">
                নেক্সট Lesson এ যান
            </h2>
        </div>
        `;
        hideLoader();
        return;
    }
  
    lessons.forEach((lesson) => {
  
      const lessonCard = document.createElement("div");

      let meaning="";
      if(lesson.meaning!=="" && lesson.meaning!==null){
        meaning=lesson.meaning;
      }
      else{
        meaning="অর্থ নেই";
      }

      let pronunciation="";
      if(lesson.pronunciation!=="" && lesson.pronunciation!==null){
        pronunciation=lesson.pronunciation;
      }
      else{
        pronunciation="উচ্চারণ নেই";
      }

      lessonCard.innerHTML = `
       <div class="card bg-white rounded-base hover:bg-[rgba(26,145,255,0.1)]">
            <div class="flex gap-[20px] items-center flex-col py-[20px]">
                <h2 class="card-title">${lesson.word}</h2>
                <p>Meaning / Pronunciation</p>
                <h6>"${meaning} / ${pronunciation}"</h6>
                <div class="flex justify-between w-full px-[10%]">
                    <button class="btn justify-start bg-[rgba(26,145,255,0.1)] p-[10px] rounded-sm hover:bg-white border-0" onclick="loadLessonDetails(${lesson.id})" ><img src="../assets/info.png" class="w-[20px]"></button>
                    <button class="btn justify-start bg-[rgba(26,145,255,0.1)] p-[10px] rounded-sm hover:bg-white border-0" onclick="pronounceWord('${lesson.word}')" ><img src="../assets/volume-up.png" class="w-[20px]"></button>
                </div>
            </div>
        </div>
      `;
      lessonContainer.append(lessonCard);
    });
    hideLoader();
  };

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
}
loadLessonCategories();