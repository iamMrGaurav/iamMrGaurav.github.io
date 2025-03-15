;(function () {
	
	'use strict';

	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	
	var fullHeight = function() {

		if ( !isMobile.any() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			});
		}
	};

	// Parallax
	var parallax = function() {
		$(window).stellar();
	};

	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 50);
				
			}

		} , { offset: '85%' } );
	};



	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};

	var pieChart = function() {
		$('.chart').easyPieChart({
			scaleColor: false,
			lineWidth: 4,
			lineCap: 'butt',
			barColor: '#FF9000',
			trackColor:	"#f5f5f5",
			size: 160,
			animate: 1000
		});
	};

	var skillsWayPoint = function() {
		if ($('#fh5co-skills').length > 0 ) {
			$('#fh5co-skills').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( pieChart , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}

	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	
	$(function(){
		contentWayPoint();
		goToTop();
		loaderPage();
		fullHeight();
		parallax();
		// pieChart();
		skillsWayPoint();
	});


}());


/* Music Player */

document.addEventListener('DOMContentLoaded', () => {
	const audio = document.getElementById('backgroundMusic');
	const playPauseBtn = document.getElementById('playPauseBtn');
	const playIcon = document.querySelector('.play-icon');
	const pauseIcon = document.querySelector('.pause-icon');
	const muteBtn = document.getElementById('muteBtn');
	const volumeIcon = document.querySelector('.volume-icon');
	const muteIcon = document.querySelector('.mute-icon');
	const rhythmBars = document.querySelector('.rhythm-bars');
	const progress = document.querySelector('.progress');
	const progressBar = document.querySelector('.progress-bar');
	const progressHandle = document.querySelector('.progress-handle');
	const currentTimeDisplay = document.getElementById('currentTime');
	const durationDisplay = document.getElementById('duration');

	// Format time in minutes:seconds
	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = Math.floor(seconds % 60);
		return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
	}

	// Update time displays
	function updateTimeDisplay() {
		currentTimeDisplay.textContent = formatTime(audio.currentTime);
		durationDisplay.textContent = formatTime(audio.duration || 0);
	}

	// Set initial time displays
	audio.addEventListener('loadedmetadata', () => {
		updateTimeDisplay();
	});

	// Play/Pause button functionality
	playPauseBtn.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
			playIcon.style.display = 'none';
			pauseIcon.style.display = 'block';
			playPauseBtn.classList.add('active');
			rhythmBars.classList.add('playing');
		} else {
			audio.pause();
			playIcon.style.display = 'block';
			pauseIcon.style.display = 'none';
			playPauseBtn.classList.remove('active');
			rhythmBars.classList.remove('playing');
		}
	});

	// Mute button functionality
	muteBtn.addEventListener('click', () => {
		if (audio.muted) {
			audio.muted = false;
			volumeIcon.style.display = 'block';
			muteIcon.style.display = 'none';
			muteBtn.classList.remove('active');
		} else {
			audio.muted = true;
			volumeIcon.style.display = 'none';
			muteIcon.style.display = 'block';
			muteBtn.classList.add('active');
		}
	});

	// Update progress bar and time display
	audio.addEventListener('timeupdate', () => {
		const percentage = (audio.currentTime / audio.duration) * 100;
		progress.style.width = `${percentage}%`;
		progressHandle.style.left = `${percentage}%`;
		updateTimeDisplay();
	});

	// Enable seeking by clicking on the progress bar
	progressBar.addEventListener('click', (e) => {
		const rect = progressBar.getBoundingClientRect();
		const clickPosition = e.clientX - rect.left;
		const percentage = clickPosition / rect.width;
		audio.currentTime = percentage * audio.duration;
	});

	// Enable dragging the progress handle
	let isDragging = false;

	progressHandle.addEventListener('mousedown', (e) => {
		isDragging = true;
		e.preventDefault();
	});

	document.addEventListener('mousemove', (e) => {
		if (isDragging) {
			const rect = progressBar.getBoundingClientRect();
			const clickPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
			const percentage = clickPosition / rect.width;
			progress.style.width = `${percentage * 100}%`;
			progressHandle.style.left = `${percentage * 100}%`;
		}
	});

	document.addEventListener('mouseup', (e) => {
		if (isDragging) {
			const rect = progressBar.getBoundingClientRect();
			const clickPosition = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
			const percentage = clickPosition / rect.width;
			audio.currentTime = percentage * audio.duration;
			isDragging = false;
		}
	});

	// Touch events for mobile devices
	progressBar.addEventListener('touchstart', (e) => {
		const rect = progressBar.getBoundingClientRect();
		const touchPosition = e.touches[0].clientX - rect.left;
		const percentage = Math.max(0, Math.min(touchPosition / rect.width, 1));
		audio.currentTime = percentage * audio.duration;
	});

	progressHandle.addEventListener('touchstart', (e) => {
		isDragging = true;
		e.preventDefault();
	});

	document.addEventListener('touchmove', (e) => {
		if (isDragging) {
			const rect = progressBar.getBoundingClientRect();
			const touchPosition = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
			const percentage = touchPosition / rect.width;
			progress.style.width = `${percentage * 100}%`;
			progressHandle.style.left = `${percentage * 100}%`;
		}
	});

	document.addEventListener('touchend', (e) => {
		if (isDragging) {
			const rect = progressBar.getBoundingClientRect();
			const touchPosition = Math.max(0, Math.min(e.changedTouches[0].clientX - rect.left, rect.width));
			const percentage = touchPosition / rect.width;
			audio.currentTime = percentage * audio.duration;
			isDragging = false;
		}
	});
});


/* GIF content Load*/

document.addEventListener("DOMContentLoaded", function () {
	const gif = document.querySelector('.flipped-gif');
	const section = document.querySelector('#fh5co-about');
	let hasPlayed = false; // Flag to track if GIF has played

	// Preload GIF to ensure it’s ready
	const tempImg = new Image();
	tempImg.src = gif.src;

	tempImg.onload = function() {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting && !hasPlayed) {
					gif.style.opacity = '1';
					hasPlayed = true;
					// Stop observing after first play
					observer.unobserve(section);
				}
			});
		}, {
			threshold: 0.5 // Trigger when 50% of the section is visible
		});

		observer.observe(section);
	};
});

/* Send Email */

function sendEmail(event) {
	event.preventDefault();
	
	var firstName = document.getElementById('fname').value.trim();
	var lastName = document.getElementById('lname').value.trim();
	var userEmail = document.getElementById('email').value.trim();
	var subject = document.getElementById('subject').value.trim();
	var message = document.getElementById('message').value.trim();

	if (!firstName || !lastName || !userEmail || !subject || !message) {
		showErrorOverlay('Please fill in all fields.');
		return;
	}

	document.getElementById('loaderOverlay').style.display = 'flex';

	var data = {
		firstname: firstName,
		lastname: lastName,
		email: userEmail,
		subject: subject,
		message: message
	};

	fetch('https://test.emphands.com.au/send-gaurav', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok.');
		}
		return response.text();
	})
	.then(data => {
		console.log('Server response:', data);
		document.getElementById('contactForm').reset(); // Reset form
		showSuccessOverlay();
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
		showErrorOverlay('An error occurred while sending the email. Please try again later.');
	})
	.finally(() => {
		document.getElementById('loaderOverlay').style.display = 'none';
	});
}

function showSuccessOverlay() {
	document.getElementById('successOverlay').style.display = 'flex';
}

function hideSuccessOverlay() {
	document.getElementById('successOverlay').style.display = 'none';
}

function showErrorOverlay(message) {
	document.getElementById('errorOverlay').querySelector('p').textContent = message;
	document.getElementById('errorOverlay').style.display = 'flex';
}

function hideErrorOverlay() {
	document.getElementById('errorOverlay').style.display = 'none';
}

/*---------Work and Blog----*/

document.addEventListener("DOMContentLoaded", function () {
    // Hearts code unchanged
    const hearts = document.querySelectorAll(".heart-icon");
    hearts.forEach(heart => {
        let randomLikes = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
        heart.dataset.count = randomLikes;
        heart.nextElementSibling.textContent = randomLikes;

        heart.addEventListener("click", function () {
            let count = parseInt(this.dataset.count);
            if (this.classList.contains("fas")) {
                this.classList.remove("fas");
                this.classList.add("far");
                count--;
            } else {
                this.classList.remove("far");
                this.classList.add("fas");
                count++;
            }
            this.dataset.count = count;
            this.nextElementSibling.textContent = count;
        });
    });
    
    const scrollContainer = document.querySelector('.shots-scroll-wrapper');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    let autoScrollInterval;
    let isHovering = false;
    
    if (scrollContainer && prevArrow && nextArrow) {
        // Position arrows on left and right sides
        prevArrow.style.position = 'absolute';
        prevArrow.style.left = '10px';
        prevArrow.style.top = '50%';
        prevArrow.style.transform = 'translateY(-50%)';
        prevArrow.style.zIndex = '10';
        
        nextArrow.style.position = 'absolute';
        nextArrow.style.right = '10px';
        nextArrow.style.top = '50%';
        nextArrow.style.transform = 'translateY(-50%)';
        nextArrow.style.zIndex = '10';
        
        // Make parent container position relative to contain absolute arrows
        scrollContainer.parentElement.style.position = 'relative';
        
        const scrollDistance = 350 + 30;
        
        // Add drag scrolling functionality for mouse
        let isMouseDown = false;
        let startX, scrollLeft;
        
        scrollContainer.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            scrollContainer.style.cursor = 'grabbing';
            startX = e.pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
            pauseAutoScroll();
        });
        
        scrollContainer.addEventListener('mouseleave', () => {
            isMouseDown = false;
            scrollContainer.style.cursor = 'default';
            isHovering = false;
            startAutoScroll();
        });
        
        scrollContainer.addEventListener('mouseup', () => {
            isMouseDown = false;
            scrollContainer.style.cursor = 'default';
            setTimeout(startAutoScroll, 3000);
        });
        
        scrollContainer.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.offsetLeft;
            const walk = (x - startX) * 2; // Adjust scroll speed
            scrollContainer.scrollLeft = scrollLeft - walk;
        });
        
        // Add touch events for mobile
        scrollContainer.addEventListener('touchstart', (e) => {
            pauseAutoScroll();
            startX = e.touches[0].pageX - scrollContainer.offsetLeft;
            scrollLeft = scrollContainer.scrollLeft;
        }, { passive: false });
        
        scrollContainer.addEventListener('touchmove', (e) => {
            if (e.touches.length === 1) { // Single finger touch
                e.preventDefault();
                const x = e.touches[0].pageX - scrollContainer.offsetLeft;
                const walk = (x - startX) * 2;
                scrollContainer.scrollLeft = scrollLeft - walk;
            }
        }, { passive: false });
        
        scrollContainer.addEventListener('touchend', () => {
            setTimeout(startAutoScroll, 3000);
        });
        
        // The rest of your existing code
        scrollContainer.addEventListener('mouseenter', function() {
            isHovering = true;
            pauseAutoScroll();
        });
        
        nextArrow.addEventListener('click', function() {
            pauseAutoScroll();
            scrollContainer.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
            setTimeout(startAutoScroll, 3000);
        });
        
        prevArrow.addEventListener('click', function() {
            pauseAutoScroll();
            scrollContainer.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
            setTimeout(startAutoScroll, 3000);
        });
        
        scrollContainer.addEventListener('scroll', function() {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            if (scrollLeft <= 10) {
                prevArrow.style.opacity = '0.5';
            } else {
                prevArrow.style.opacity = '1';
            }
            
            if (scrollLeft >= maxScroll - 10) {
                nextArrow.style.opacity = '0.5';
            } else {
                nextArrow.style.opacity = '1';
            }
        });
        
        // Auto scroll functions
        function autoScroll() {
            const scrollLeft = scrollContainer.scrollLeft;
            const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
            
            if (scrollLeft >= maxScroll - 10) {
                scrollContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                scrollContainer.scrollBy({
                    left: scrollDistance,
                    behavior: 'smooth'
                });
            }
        }
        
        function startAutoScroll() {
            if (!isHovering && !autoScrollInterval) {
                autoScrollInterval = setInterval(autoScroll, 3000);
            }
        }
        
        function pauseAutoScroll() {
            if (autoScrollInterval) {
                clearInterval(autoScrollInterval);
                autoScrollInterval = null;
            }
        }
        
        prevArrow.style.opacity = '0.5';
        startAutoScroll();
        
        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
                pauseAutoScroll();
            } else if (!isHovering) {
                startAutoScroll();
            }
        });
    }
    
    // Lightbox code unchanged
    const lightboxOverlay = document.createElement('div');
    lightboxOverlay.className = 'lightbox-overlay';
    lightboxOverlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); display: none; z-index: 1000; justify-content: center; align-items: center;';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    lightboxContent.style.cssText = 'position: relative; max-width: 90%; max-height: 90%;';
    
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    lightboxImage.style.cssText = 'max-width: 100%; max-height: 90vh; display: block; margin: 0 auto; box-shadow: 0 0 20px rgba(0,0,0,0.5);';
    
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '&times;';
    closeButton.style.cssText = 'position: absolute; top: -40px; right: 0; font-size: 30px; color: white; background: transparent; border: none; cursor: pointer;';
    
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightboxOverlay.appendChild(lightboxContent);
    document.body.appendChild(lightboxOverlay);
    
    const blogImages = document.querySelectorAll('.blog-bg');
    
    blogImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            pauseAutoScroll();
            
            const bgImageUrl = getComputedStyle(img).backgroundImage.slice(4, -1).replace(/"/g, "");
            
            lightboxImage.src = bgImageUrl;
            lightboxOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButton.addEventListener('click', function() {
        lightboxOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        if (!isHovering) {
            setTimeout(startAutoScroll, 3000);
        }
    });
    
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            if (!isHovering) {
                setTimeout(startAutoScroll, 3000);
            }
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightboxOverlay.style.display === 'flex') {
            lightboxOverlay.style.display = 'none';
            document.body.style.overflow = 'auto'; 
            
            if (!isHovering) {
                setTimeout(startAutoScroll, 3000);
            }
        }
    });
});
