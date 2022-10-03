from selenium import webdriver
import time

url = 'https://kentaroaso.github.io/kentaroaso/'

save_file = '/Users/kentaroaso/Downloads/test_screenshot.png'


def screenshot_full(url, save_file):
    w, h = get_page_size(url)
    screenshot_size(url, save_file, w, h)


def get_page_size(url):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    driver = webdriver.Chrome(
        '/Users/kentaroaso/opt/anaconda3/bin/chromedriver', options=options)
    driver.get(url)
    w = driver.execute_script("return document.body.scrollWidth;")
    h = driver.execute_script("return document.body.scrollHeight;")
    driver.close()
    print('page_size=', w, h)
    return (w, h)


def screenshot_size(url, save_file, w, h):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    win_size = 'window-size=' + str(w) + ',' + str(h)
    options.add_argument(win_size)
    cap_driver = webdriver.Chrome(
        '/Users/kentaroaso/opt/anaconda3/bin/chromedriver', options=options)
    cap_driver.get(url)
    time.sleep(5)
    cap_driver.save_screenshot(save_file)
    cap_driver.close()


if __name__ == '__main__':
    screenshot_full(url, save_file)