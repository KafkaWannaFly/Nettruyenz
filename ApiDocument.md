# APIs Document

Tài liệu này nói về giao tiếp giữa Front-end và Back-end. Cấu trúc dữ liệu được truyền và nơi để lấy chúng.

<div style="text-align:center" ><img src="ApiDocument.assets/image-20210404210907517.png" alt="image-20210404210907517" style="zoom:80%;" /></div>

## Home

`Home` là trang mặc định của web, nằm tại `https://hostname/`. Nó có các route con:

### `/most-view` Lượt xem nhiều

Trả về dữ liệu những bộ có lượt xem nhiều nhất. Có thể lựa chọn 3 khoảng thời gian khác nhau bằng query:

- `/most-view?period=weekly` Nhất tuần
- `/most-view?period=monthly` Nhất tháng
- `/most-view?period=all` Toàn thời gian. Đây là lựa chọn mặc định, nếu không query cụ thể hoặc giá trị khác với 2 giá trị trên thì trả về toàn thời gian

Dữ liệu trả về là 1 mảng `BriefMangaDto`. Trông như này:

```json
[
	{
		"_id": "606736b7b0c6ff4b1cb254db",
		"names": [
			"Mairimashita! Iruma-kun",
			"魔入りました！入間くん"
		],
		"creators": [
			"Osamu Nishi"
		],
		"tags": [
			"Action",
			"Comedy",
			"Fantasy",
			"School Life",
			"Shounen",
			"Supernatural"
		],
		"id": "6e5c9054-8ff6-47d1-8c5c-5905683125d3",
		"cover": "https://i.imgur.com/c5JqYVW.jpg",
		"description": "Mairimashita! Iruma-kun",
		"status": 0,
		"createdAt": "2021-04-02T15:22:31.517Z",
		"updatedAt": "2021-04-02T15:22:31.517Z",
		"__v": 0,
		"views": 703,
		"bookmarks": 47,
		"averageRate": 3.111111111111111,
		"newestChapter": {
				"images": [
					"https://3.bp.blogspot.com/-d4fXRQT2xXg/VMqNw1oZyJI/AAAAAAAAL58/oKXY2Frg4_k/s0/1%252520%2525281%252529.jpg",
					"https://2.bp.blogspot.com/-HKz-Y77dlhs/VMqNxx5Ie4I/AAAAAAAAL6E/6ohkvvG7j_0/s0/1%252520%2525281%252529.png",
					// A lot of URL
				],
				"_id": "6067369cb0c6ff4b1cb2544b",
				"id": "9da93bd5-a9bb-441e-99d6-8e9fc120b00e",
				"group": "0",
				"index": 9.1,
				"manga": "9ff07e48-0fd4-4f36-b42d-0e8f4e1c2bb1",
				"tittle": "",
				"uploader": "kafka",
				"views": 85,
				"__v": 0,
				"createdAt": "2021-04-02T15:22:04.462Z",
				"updatedAt": "2021-04-02T15:24:55.569Z"
			}
		
	},
    // And many more
]
```



### `/most-followed` Được theo dõi nhiều

Trả về những bộ được bookmark nhiều nhất, theo 3 khoảng thời gian:

- `/most-view?period=weekly` Nhất tuần
- `/most-view?period=monthly` Nhất tháng
- `/most-view?period=all` Toàn thời gian. Đây là lựa chọn mặc định, nếu không query cụ thể hoặc giá trị khác với 2 giá trị trên thì trả về toàn thời gian

Dữ liệu trả về là 1 mảng `BriefMangaDto`. 



### `/most-rating` Được đánh giá cao nhất

Trả về những bộ có điểm trung bình cao nhất, theo 3 khoảng thời gian:

- `/most-view?period=weekly` Nhất tuần
- `/most-view?period=monthly` Nhất tháng
- `/most-view?period=all` Toàn thời gian. Đây là lựa chọn mặc định, nếu không query cụ thể hoặc giá trị khác với 2 giá trị trên thì trả về toàn thời gian

Dữ liệu trả về là 1 mảng `BriefMangaDto`. 



### `/recently-uploaded` Vừa có chap mới

Trả về những bộ có chap mới vừa lên. Dữ liệu trả về là 1 mảng `BriefMangaDto`. 



### `/newly-added` Bộ truyện mới được đăng lần đầu

Trả về những bộ truyện mới nhất, vừa được đang. Dữ liệu trả về là 1 mảng `BriefMangaDto`. 



## Data Transfer Objects (DTOs)

### ChapterDto

Là đối tượng chứa thông tin về 1 chap truyện.

```typescript
interface ChapterDto {
    id?: string;
	images?: string[];
	manga?: string;
	index?: number;
	tittle?: string;
	uploader?: string;
	views?: number;
	group?: string;
    
	createdAt?: Date;
	updatedAt?: Date;
}
```

### BriefMangaDto

Là đối tượng chứa thông tin sơ bộ về 1 bộ manga, dùng ở trang `Home`

```typescript
interface BriefMangaDto {
    id: string;
	names: string[];
	cover: string;
	tags: string[];
	creators?: string[];
	status?: MangaStatus;
	description: string;
    averageRate?: number;
	bookmarks?: number;
	views?: number;
	newestChapter?: ChapterDto; // Chapter mới nhất
    
	createdAt?: Date;
	updatedAt?: Date;
}

enum MangaStatus {
	OnGoing,
	Complete,
	Dropped,
}
```

