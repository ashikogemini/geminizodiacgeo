const fs = require("fs");
let c = fs.readFileSync("App.js", "utf8");

// ვპოულობთ სად იწყება პირველი ძველი ბლოკი ("ტყუპები და სხვა ნიშნები")
const startIndex = c.indexOf("{/* ♊ ტყუპები და სხვა ნიშნები ღილაკი და ფანჯრები */}");

if (startIndex !== -1) {
  // ვპოულობთ სად მთავრდება ეს ბლოკები (ბოლო მოდალების შემდეგ, სადაც bottomNav იწყება)
  const endIndex = c.indexOf("bottomNav", startIndex);
  if (endIndex !== -1) {
    // ვტოვებთ იმ ნაწილს სადაც bottomNav იწყება (ანუ ვჭრით შუიდან ამ ოთხ ბლოკს)
    // ოღონდ სანამ bottomNav არის, უნდა ვიპოვოთ შესაბამისი დახურვიდან
    // მოდი, უბრალოდ ვნახოთ სად მთავრდება ამ ბლოკების კონტეინერი (scrollView-ს დახურვა)
    // უფრო მარტივად: ვჭრით ზუსტად იმ კომენტარიდან bottomNav-ის დასაწყისამდე და ვტოვებთ ერთ სუფთა </ScrollView></SafeAreaView>
    
    const beforeBlocks = c.substring(0, startIndex);
    const afterBlocks = c.substring(endIndex - 20); // ვინახავთ bottomNav-ს და ბოლო ტეგებს

    c = beforeBlocks + "\n</ScrollView>\n</SafeAreaView>\n" + afterBlocks;
    fs.writeFileSync("App.js", c, "utf8");
    console.log("Step 2 completed: Old 4 blocks removed successfully!");
  } else {
    console.log("End marker not found.");
  }
} else {
  console.log("Start marker not found.");
}
