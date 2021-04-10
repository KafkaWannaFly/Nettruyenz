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



## Categories

Nằm ở `https://hostname/categories`, là nơi chứa các bộ manga. Đây là nơi ta lấy thông tin sơ lược về các bộ manga.

### `/` Route mặc định

Trả về mảng `BriefMangaDto` là những bộ manga vừa có chap cập nhật mới nhất.

### Query

Route này cung cấp các tham số query sau:

#### Title

Lọc theo tên. Ví dụ:

`https://hostname/category?title=sword-art-online`

Dữ liệu trả về là 1 mảng `BriefMangaDto` có chứa “sword art online” trong tên, không phân biệt hoa thường.

#### Author

Lọc theo tác giả. Ví dụ:

`https://hostname/categories?title=meta&author=shidol`

#### Sort by

Dữ liệu trả về được sắp xếp theo:

- View: Lượt xem
- Follow: Lượt theo dõi
- Rate: Điểm đánh giá
- Date: Ngày cập nhật chap mới

Ví dụ:

`https://hostname/categories?author=meme50&sortBy=view`

Trả về mảng `BriefMangaDto` là những bộ có lượt xem cao nhất, được vẽ bởi meme50.

Nếu không định nghĩa gì thì lấy Date làm mặc định. Nếu các tham số kia bằng nhau thì lấy Date để so sánh. Nếu Date cũng bằng nhau thì là duyện phận （づ￣3￣）づ╭❤～

Đùa thôi, lúc ấy query database nó xếp như nào thì mình theo như ấy.

#### Order

Dữ liệu trả về được sắp xếp từ lớn tới nhỏ `desc` hoặc ngược lại, từ nhỏ tới lớn `asc`.

Ví dụ:

`https://hostname/categories?sortBy=rate&order=asc`

Trả về những bộ bị ghét nhất web :<

Nếu không định nghĩa thì mặc định là xếp từ cao đến thấp `desc`.

#### Period

Dữ liệu được trả theo khoảng thời gian nhất định, gồm:

- Weekly: Tuần này
- Monthly: Tháng này
- All-time: Toàn thời gian

Ví dụ:

`https://hostname/categories?sortBy=rate&period=weekly`

Trả về những bộ được đánh giá cao nhất trong tuần này.

Ví dụ 2:

`https://hostname/categories?period=weekly`

Trả về những bộ vừa đăng chap mới trong tuần này.

#### Tags

Lọc theo 1 hoặc nhiều tag. Ví dụ:

`https://hostname/categories?tags=action&tags=isekai&tags=romance`

Trả về những bộ có tag: action, isekai và romance.



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

Là đối tượng chứa thông tin sơ bộ về 1 bộ manga

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

