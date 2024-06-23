$(document).ready(function () {
  function toggleFlurries() {
    $(this).toggleClass('active')
    $('.snow').toggleClass('flurries')
  }
  // Fade out snow effect and add toggle function to snowflake icon
  function endFlurries() {
    $('.action-banner-bg').css('will-change', 'opacity').addClass('loaded')
    setTimeout(function () {
      $('#snow-toggle').fadeIn()
      $('#snow-toggle').removeClass('active')
      $('.snow').css('will-change', 'opacity').addClass('flurries')
      $('#snow-toggle').on('click', toggleFlurries)
    }, 5500)
  }

  endFlurries()
  $('#nav a').localScroll()
  $('#nav a').on('click', function () {
    if ($(this).attr('href').includes('resume')) {
      return
    }
    event.preventDefault()
    $('body').clearQueue()
    $(event.target).blur()
    var sectionTop = $(this.hash).position().top
    $('html, body').animate({ scrollTop: sectionTop }, 300, 'linear')
  })

  $('#show-more-btn').on('click', function () {
    $('.project-item.hidden')
      .find('.project-item-overlay')
      .addClass('no-pointer-events')

    $('.project-item.hidden').hide().removeClass('hidden').fadeIn(500)

    $(this).remove()

    window.setTimeout(function () {
      $('.project-item-overlay').removeClass('no-pointer-events')
    }, 500)
  })

  function addLangIcons() {
    var baseUrl =
      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/{lang}/{lang}-original.svg'

    var plainOnlyLangs = ['django', 'rails']

    $('.lang-overlay').each(function () {
      var langs = $(this).data('lang').split(' ')
      langs.forEach(lang => {
        var srcUrl = baseUrl.replace(/{lang}/g, lang)

        if (plainOnlyLangs.includes(lang)) {
          srcUrl = srcUrl.replace('-original', '-plain')
        }

        $(this).append(`<img class="mini-icon" src="${srcUrl}" alt="${lang}">`)
      })
    })

    let date = new Date()
    $('#year').text(date.getFullYear())
  }
  addLangIcons()

  window.addEventListener(
    'wheel',
    function () {
      $('body').stop()
    },
    { passive: true }
  )
})
