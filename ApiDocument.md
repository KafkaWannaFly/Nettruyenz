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
		"_id": "6085851907191c3f5c4336f1",
		"names": [
			"Boku No Hero Academia",
			"My hero Academia",
			"僕のヒーローアカデミア",
			"Trường Học Siêu Anh Hùng"
		],
		"id": "10",
		"cover": "https://i.imgur.com/ptcZbuI.jpg",
		"description": "Câu chuyện lấy bối cảnh thời hiện đại, có khác một điều là những người có năng lực đặc biệt lại trở nên quá đỗi bình thường. Một cậu bé tên Midoriya Izuku tuy không có năng lực gì nhưng cậu vẫn mơ ước",
		"status": 0,
		"createdAt": "2021-04-25T15:04:57.550Z",
		"updatedAt": "2021-04-25T15:04:57.550Z",
		"__v": 0,
		"views": 703,
		"bookmarks": 10,
		"averageRate": 3.4166666666666665,
		"briefChapterDto": {
			"id": "16-155",
			"manga": "16",
			"index": 52,
			"tittle": "",
			"createdAt": "2021-04-25T15:05:08.618Z",
			"mangaNames": [
				"Boku No Hero Academia",
				"My hero Academia",
				"僕のヒーローアカデミア",
				"Trường Học Siêu Anh Hùng"
			]
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

## Tags

Nằm ở `hostname/tags`. Là nơi lấy tất cả những tag hiện có.

### `/` Route mặc định

Trả về 1 mảng `TagDto` là tất cả những tag hiện có. 

## Mangas

Nằm ở `https://hostname/mangas`. Đây là nơi ta lấy thông tin chi tiết của 1 bộ manga nhất định. Theo cú pháp:

`https://hostname/mangas/<manga-id>`. 

Ví dụ:

`https://hostname/mangas/9ff07e48-0fd4-4f36-b42d-0e8f4e1c2bb1`

Trả về 1 object có kiểu `CompletedMangaDto`

## Sign Up

Nằm ở `hostname/sign-up`. 

### `/` Route mặc định:

Phương thức `post` dùng để đăng ký 1 tài khoản mới. Chấp nhận request body dạng JSON, có cấu trúc như sau:

```json
{
    "email": "18127084@student.hcmus.edu.vn",
    "password": "123"
}
```



Trả về `UserDto` nếu thành công. 

```json
{
	"email": "18127084@student.hcmus.edu.vn",
	"password": "$2b$10$nvdRI3zsz/P62L6Tn3tmQ.wyKT1bwqskmR1ZIdNE3ON6I8oIbIloG",
	"level": 0
}
```



Một tin nhắn thông báo nếu thất bại.

```json
{
	"error": "Sign up fail. 18127084@student.hcmus.edu.vn has already existed"
}
```



## Sign In

Nằm ở `hostname/sign-in`.

### `/` Route mặc định

Phương thức `post` dùng để đăng nhập 1 tài khoản. Chấp nhận request body dạng JSON, có cấu trúc như sau:

```json
{
	"email": "18127084@student.hcmus.edu.vn",
	"password": "123"
}
```



Trả về `UserDto` và 1 beerer `token` nếu thành công. Token nên được lưu lại để sử dụng tại những nơi yêu cầu người dùng đã đăng nhập.

```json
{
	"user": {
		"_id": "608454327064c300843f3726",
		"email": "18127084@student.hcmus.edu.vn",
		"password": "$2b$10$nvdRI3zsz/P62L6Tn3tmQ.wyKT1bwqskmR1ZIdNE3ON6I8oIbIloG",
		"level": 0,
		"createdAt": "2021-04-24T17:24:02.144Z",
		"updatedAt": "2021-04-24T17:24:02.144Z",
		"__v": 0
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg0NTQzMjcwNjRjMzAwODQzZjM3MjYiLCJlbWFpbCI6IjE4MTI3MDg0QHN0dWRlbnQuaGNtdXMuZWR1LnZuIiwicGFzc3dvcmQiOiIkMmIkMTAkbnZkUkkzenN6L1A2Mkw2VG4zdG1RLnd5S1QxYndxc2ttUjFaSWRORTNPTjZJOG9JYklsb0ciLCJsZXZlbCI6MCwiY3JlYXRlZEF0IjoiMjAyMS0wNC0yNFQxNzoyNDowMi4xNDRaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0yNFQxNzoyNDowMi4xNDRaIiwiX192IjowLCJpYXQiOjE2MTkyODUxOTh9.0i88Ni-kb2jvqX93oZsdWqMlIliF5ZJ10PsGy9xlbeY"
}
```



Một tin nhắn thông báo nếu thất bại.

```json
{
	"error": "Incorrect password"
}
```



### Sử dụng token

Tại những route yêu cầu cần phải là người dùng đã đăng nhập, header sẽ cần phải thêm thuộc tính `Authorization`. 

```json
// Header of request
{
    // Some defaults settings...
    
    "Authorization": "Beerer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDg0NTQzMjcwNjRjMzAwODQzZjM3MjYiLCJlbWFpbCI6IjE4MTI3MDg0QHN0dWRlbnQuaGNtdXMuZWR1LnZuIiwicGFzc3dvcmQiOiIkMmIkMTAkbnZkUkkzenN6L1A2Mkw2VG4zdG1RLnd5S1QxYndxc2ttUjFaSWRORTNPTjZJOG9JYklsb0ciLCJsZXZlbCI6MCwiY3JlYXRlZEF0IjoiMjAyMS0wNC0yNFQxNzoyNDowMi4xNDRaIiwidXBkYXRlZEF0IjoiMjAyMS0wNC0yNFQxNzoyNDowMi4xNDRaIiwiX192IjowLCJpYXQiOjE2MTkyODUxOTh9.0i88Ni-kb2jvqX93oZsdWqMlIliF5ZJ10PsGy9xlbeY"
}
```

Ví dụ:

```json
{
    "Authorization": "Beerer <token>"
}
```



## Forgot Password

Nằm ở `hostname/forgot-password`, dùng để đổi mật khẩu tài khoản.

### `/` Route mặc định

#### Get

Nhận 1 tham số query là `email`. Sẽ gửi 1 mã OTP về email này để xác nhận. Ví dụ:

`localhost:3000/forgot-password?email=18127084@student.hcmus.edu.vn`

Kết quả:

```json
{
	"message": "Send OTP to 18127084@student.hcmus.edu.vn"
}
```

#### Post

Xác nhận mã OTP và mật khẩu mới. Dữ liệu được truyền từ request body:

```json
{
    "email": "18127084@student.hcmus.edu.vn",
    "code": "177013",
    "newPassword": "123456"
}
```

Trả về `UserDto` nếu nhập đúng. Tin nhắn thông báo nếu nhập sai.

```json
{
	"error": "Wrong OTP"
}
```

## User

Nằm ở `hostname/user/`

### Route mặc định

#### Get

Yêu cầu phải đăng là người dùng đã đăng nhập.

Tại header của request cần trường `Authorization` với giá trị là `Bearer <token>`

Trả về `UserDto` object chứa những thông tin liên quan đến người dùng đã đăng nhập.

```json
{
	"email": "18127084@student.hcmus.edu.vn",
	"level": 1,
	"nickname": "Kafka Wanna Fly",
	"avatar": "https://en.gravatar.com/userimage/160211096/bb2f6fdf53965cbc01bb4c2f7e8c320d.jpg?size=200",
	"password": "$2b$10$Z3WdvKHVvb/LjJmvdi6kA.hlw4v9E1Cgdn5s.OjFkRbA9VF.v9xky",
	"bookmarks": [
		{
			"_id": "6086d781ea2a040ef860a30e",
			"manga": "33",
			"email": "18127084@student.hcmus.edu.vn",
			"__v": 0,
			"createdAt": "2021-04-26T15:08:49.805Z",
			"updatedAt": "2021-04-26T15:08:49.805Z"
		},
        // Many more
	],
	"ratesMade": [
		{
			"_id": "6086d8179c3b811d04339d74",
			"manga": "16",
			"rate": 1,
			"email": "18127084@student.hcmus.edu.vn",
			"isDeleted": false,
			"__v": 0,
			"createdAt": "2021-04-26T15:11:19.403Z",
			"updatedAt": "2021-04-26T15:11:19.403Z"
		},
        // Many more
	],
    "history": [
		{
			"_id": "6086d5f949dc6007704984b5",
			"chapter": "40-384",
			"manga": "40",
			"email": "18127084@student.hcmus.edu.vn",
			"__v": 0,
			"createdAt": "2021-04-26T15:02:17.407Z",
			"updatedAt": "2021-04-26T15:02:17.407Z"
		},
        // Many more
	]
}
```



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
    tags?: string[];
    creators: string[];
    description: string;
    status: MangaStatus;

    averageRate?: number;
    bookmarks?: number;
    views?: number;

    briefChapterDto?: BriefChapterDto;

    createdAt?: Date;
    updatedAt?: Date;
}
```

### CompletedMangaDto

```typescript
interface CompletedMangaDto {
	id: string;
	names: string[];
	cover: string;
	tags: string[];
	creators?: string[];
	status?: MangaStatus;
	description: string;

	createdAt?: Date;
	updatedAt?: Date;
    
	averageRate?: number;
	bookmarks?: number;
	views?: number;

	chapters?: ChapterDto[];
	comments?: CommentDto[];
}
```

### TagDto

```typescript
interface TagDto {
	name: string;
}
```

### UserDto

```typescript
interface UserDto {
    email: string;
	password: string;
	nickname: string;
	avatar?: string;
	level: UserLevel;
	createdAt?: Date;
	// groups?: Group[]; // Add later
	bookmarks?: BookmarkDto[];
	history?: MangaChapterViewDto[];
	// notifications?: Notification[]; // Add later
	ratesMade?: MangaRateDto[];
}
```

### BookmarkDto

```typescript
interface Bookmark {
	id?: string;
	email: string;
	briefMangaDto: BriefMangaDto;
}
```

### MangaChapterViewDto

```typescript
interface MangaChapterView {
	id?: string;
	email: string;
	manga: string;
	chapter: string;
	createdAt?: Date;
	updatedAt?: Date;
    briefChapterDto: BriefChapterDto;
}
```

### BriefChapterDto

```typescript
interface BriefChapterDto {
	manga?: string;
	mangaNames?: string[];
	index?: number;
	tittle?: string;
	views: number;
	createdAt?: Date;
}
```

### MangaRateDto

```typescript
interface MangaRate {
	id?: string;
	email: string;
	manga: string;
	rate: number;
	isDeleted: boolean;
	createdAt?: Date;
	updatedAt?: Date;
}
```

