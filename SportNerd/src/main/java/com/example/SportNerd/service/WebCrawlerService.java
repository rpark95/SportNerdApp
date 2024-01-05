package com.example.SportNerd.service;

import org.jsoup.Jsoup;
import org.jsoup.select.Elements;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class WebCrawlerService {
    WebDriver driver;
    Elements links;

    public void initWebDriverAndLinks(String xPath, String url, String cssQuery) {
        driver = new FirefoxDriver();
        driver.get(url);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.xpath(xPath)));

        links = Jsoup.parse(driver.getPageSource()).select(cssQuery);
        driver.quit();
    }
}
