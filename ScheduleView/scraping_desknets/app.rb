require 'nokogiri'
require 'json'


json_file_path = '../schedule.json'





			html = File.read('./html.html')
			doc = Nokogiri::HTML(html)
			#p doc.xpath('//*[@id="jsch-schweekgrp"]/form/div[3]/div[3]')
			#p doc.xpath('//*[@id="jsch-schweekgrp"]/form/div[3]/div[3]/div[2]/table/tbody/tr/td[1]/div')

				schedules = {}
				names = []

				doc.css(".sch-gcal-target-header").each do |node|
					userId = node.xpath("./@data-target").to_s;

					name = node.xpath("./div/a/text()").to_s;
					names.push('userId'=> userId, 'name' => name)

				end



			doc.css(".cal-h-meter.sch-cal-body.other.jsch-cal.jsch-members-group-cal").each do |node|
				userId = node.xpath("./@data-target").to_s;
				dayPlans = [];
				node.xpath("./div/div/div/div").each do |item|
					startTime = item.xpath("./a/@title").to_s.slice(0..4)
					endTime = item.xpath("./a/@title").to_s.slice(8..12)
					plan = item.xpath("./a/text()").to_s
					dayPlans.push({
						start: startTime,
						end: endTime,
						text: plan
					})
				end
				userName = ""

				names.each do |name|
					if name["userId"] == userId
						userName = name["name"]
					end
				end
				schedules[userId] =
					{
						'title' => userName,
						'schedule' => dayPlans,
					}
				;
			end

			File.open(json_file_path, 'w') do |file|
				file.puts(JSON.pretty_generate(schedules))
			end
