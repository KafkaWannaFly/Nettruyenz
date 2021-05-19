# APIs Document

Tài liệu này nói về giao tiếp giữa Front-end và Back-end. Cấu trúc dữ liệu được truyền và nơi để lấy chúng.

<div style="text-align:center" ><img src="ApiDocument.assets/image-20210404210907517.png" alt="image-20210404210907517" style="zoom:80%;" /></div>

[TOC]



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
		"id": "10",
		"cover": "https://i.imgur.com/ptcZbuI.jpg",
		"creators": [
			"Horikoshi Kouhei"
		],
		"description": "Câu chuyện lấy bối cảnh thời hiện đại, có khác một điều là những người có năng lực đặc biệt lại trở nên quá đỗi bình thường. Một cậu bé tên Midoriya Izuku tuy không có năng lực gì nhưng cậu vẫn mơ ước",
		"names": [
			"Boku No Hero Academia",
			"My hero Academia",
			"僕のヒーローアカデミア",
			"Trường Học Siêu Anh Hùng"
		],
		"status": 0,
		"tags": [
			"Action",
			"Adventure",
			"Comedy",
			"Shounen",
			"Supernatural"
		],
		"averageRate": 3.4166666666666665,
		"bookmarks": 10,
		"views": 707,
		"briefChapterDto": {
			"id": "10-100",
			"manga": "10",
			"index": 9.1,
			"tittle": "",
			"createdAt": "2021-04-25T15:04:57.545Z"
		},
		"createdAt": "2021-04-25T15:04:57.550Z",
		"updatedAt": "2021-04-25T15:04:57.550Z"
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

```json
{
	"id": "11",
	"names": [
		"Bokutachi wa benkyou ga dekinai",
		"We can't Study",
		"Học vầy sao mà được",
		"Chúng ta không thể học"
	],
	"cover": "https://static.hocvientruyentranh.net/upload/thumb/1605101440099-1jpg.jpeg",
	"description": "Yugia Nariyuki năm 3 cao trung, thuộc dạng con nhà nghèo vượt khó học giỏi. Được trường cử là \"gia sư\" cho 2 nhỏ thiên tài của trường. Nhỏ đầu tiên Ogata Rizu thiên tài toán học (và lý). nhỏ thứ hai Furuhashi Fumino thiên tài văn học. Rồi 2 nhỏ này blabla... cái trường này thì blabla... rồi blabla... Nói chung cứ vào đọc ắt biết :v",
	"creators": [
		"Tsutsui Taishi"
	],
	"tags": [
		"Harem",
		"Romance",
		"School Life"
	],
	"status": 0,
	"createdAt": "2021-04-25T15:04:59.187Z",
	"updatedAt": "2021-04-25T15:04:59.187Z",
	"averageRate": 2.8181818181818183,
	"bookmarks": 13,
	"views": 409,
	"briefChapterDtos": [
		{
			"id": "11-101",
			"manga": "11",
			"index": 1,
			"tittle": "",
			"createdAt": "2021-04-25T15:04:59.181Z"
		},
        //...
    ],
    "userCommentDtos": [
		{
			"email": "Tyrel_Marks@hotmail.com",
			"manga": "11",
			"content": "et est nihil sint alias ducimus inventore cupiditate odit eum officiis quia odio doloremque dolorem voluptatibus dolorum deserunt dolorum assumenda",
			"createdAt": "2021-04-26T15:23:31.547Z"
		},
        //...
    ]
}
```



## Sign Up

Nằm ở `hostname/sign-up`. 

### `/` Route mặc định:

Phương thức `post` dùng để đăng ký 1 tài khoản mới. Chấp nhận request body dạng JSON, có cấu trúc như sau:

```json
{
    "email": "18127084@student.hcmus.edu.vn",
    "password": "123",
    "nickname": "Kafka Wanna Fly" // Optional
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

## Chapter

### Route mặc định

Nằm ở GET `host/chapters/:id` với `id` là id của chapter đó.

Nếu là người dùng đã đăng nhập thì đưa chapter này vào lịch sử của người ấy.

Dữ liệu trả về là 1 object `ChapterDto`

```json
{
	"id": "10-91",
	"manga": "10",
	"index": 0.1,
	"images": [
		"https://3.bp.blogspot.com/-OlzPEEqQI90/VP6HBTRGleI/AAAAAAABeI4/ovwpfRaWxVM/s0/01ACredit.jpg",
		"https://4.bp.blogspot.com/-aybOU9LCiTA/VP6HDB55-jI/AAAAAAABeJA/4JZ2jk9Zo3w/s0/01R.jpg",
		"https://2.bp.blogspot.com/-zKO0y4mTkGE/VP6HEa0uuxI/AAAAAAABeJI/6hMGdgU_yV0/s0/02R.jpg",
		"https://4.bp.blogspot.com/-EXfPE5_eGtE/VP6HF497lrI/AAAAAAABeJQ/BR-DMErV4JA/s0/03-04.jpg",
		"https://4.bp.blogspot.com/-OQPyt2NH2JU/VP6HG-HUekI/AAAAAAABeJY/k7NPjDQk1Uw/s0/05.png",
		"https://3.bp.blogspot.com/-sIaN76mhVzE/VP6HHmU-tFI/AAAAAAABeJg/4iqZNqruAUE/s0/06.png",
		"https://4.bp.blogspot.com/-pSf7pGpafAs/VP6HIlXU4_I/AAAAAAABeJo/C8za9L3i6W8/s0/07.png",
		"https://2.bp.blogspot.com/-qw92ri0_ljE/VP6HJeBKy3I/AAAAAAABeJw/zuxvzsivG1k/s0/08.png",
		"https://1.bp.blogspot.com/-xoF2coHD2Sk/VP6HKdd2_jI/AAAAAAABeJ4/qOus-NAlxEA/s0/09R.png",
		"https://2.bp.blogspot.com/-OtftmAjUYgY/VP6HLE4PnFI/AAAAAAABeJ8/0yZ9rxQeltk/s0/10.png",
		"https://3.bp.blogspot.com/-_KaGMh3UoIw/VP6HL7CtN8I/AAAAAAABeKI/btT_jFEimG4/s0/11.png",
		"https://2.bp.blogspot.com/-xVf9uZgT2x0/VP6HMtnh2MI/AAAAAAABeKM/I-GsB-TMTrU/s0/12.png",
		"https://4.bp.blogspot.com/-bWRBhf_EuyA/VP6HNExxCzI/AAAAAAABeKY/ki8vN5SYRMo/s0/13.png",
		"https://3.bp.blogspot.com/-H-21eR0Gc8o/VP6HN5mN81I/AAAAAAABeKg/J6Y1tyAcxrE/s0/14.png",
		"https://4.bp.blogspot.com/-D8QQLqGb34o/VP6HOpG8hwI/AAAAAAABeKo/NgTxfwr-MpA/s0/15.png",
		"https://4.bp.blogspot.com/-mFpunePNOuc/VP6HPeC04RI/AAAAAAABeKw/VCQw2qT5nhc/s0/16.png",
		"https://3.bp.blogspot.com/-uio_YNvxkwc/VP6HQH1gtLI/AAAAAAABeK4/m5jwkQhN2mc/s0/17.png",
		"https://4.bp.blogspot.com/-vx4Q8HnctSw/VP6HSVQcS1I/AAAAAAABeLA/HEfAqEqyOEE/s0/18.png",
		"https://4.bp.blogspot.com/-NW-mvqIB2t4/VP6HTZZh4_I/AAAAAAABeLI/xyNGJQyepQ8/s0/19.png",
		"https://2.bp.blogspot.com/-iiZpJHC7--Y/VP6HUtbIVLI/AAAAAAABeLQ/bKPaYmrz3Rk/s0/20.png",
		"https://3.bp.blogspot.com/-D3KTkpt7-Rc/VP6HVAuo2ZI/AAAAAAABeLY/d6E1JXEw82w/s0/21.png",
		"https://4.bp.blogspot.com/-IAewiu8SCwE/VP6HWaNG_2I/AAAAAAABeLg/ufNcdqUTyyY/s0/22.png",
		"https://3.bp.blogspot.com/-_UikeGXMV5I/VP6HXAF0YBI/AAAAAAABeLo/EH0sRxJ6xBI/s0/23.png",
		"https://3.bp.blogspot.com/-ofsE3bA5dfQ/VP6HYJikNnI/AAAAAAABeLw/VSdWlvLn608/s0/24.png",
		"https://2.bp.blogspot.com/-a7Tnm4TiKzA/VP6HZL3rV9I/AAAAAAABeL4/puviw35sFNE/s0/25.png",
		"https://3.bp.blogspot.com/-Lb6a4cHPHQ4/VP6HZytBhaI/AAAAAAABeMA/SjPAL7TLP0M/s0/26.png",
		"https://2.bp.blogspot.com/-llSIeUimXso/VP6HapD4StI/AAAAAAABeMI/T73VZX4Zi1A/s0/27.png",
		"https://3.bp.blogspot.com/-FZAHaG-eNFo/VP6HbSPPkKI/AAAAAAABeMQ/i2_404ocmDo/s0/28.png",
		"https://3.bp.blogspot.com/-axzE5ALkPHM/VP6HcFbkYFI/AAAAAAABeMY/T9Jsu-BWm7k/s0/29.png",
		"https://3.bp.blogspot.com/-xDds7QzV4Qk/VP6HdLYbJYI/AAAAAAABeMg/2pP36z-ZeV4/s0/30.png",
		"https://4.bp.blogspot.com/-iJWgkLqijK8/VP6Hd1UWvBI/AAAAAAABeMo/ZZM3oXyzPd4/s0/31.png",
		"https://4.bp.blogspot.com/-W5RcgAFhpsc/VP6HefVMy1I/AAAAAAABeMw/3_xGDSiW86U/s0/32.png",
		"https://1.bp.blogspot.com/-lDkmrTBg_wc/VP6HfPK20sI/AAAAAAABeM4/kE8XJPwyf0c/s0/33.png",
		"https://3.bp.blogspot.com/-2ncZSYePBa4/VP6Hf7fDY6I/AAAAAAABeNA/VSA0iQxPKXg/s0/34R.png",
		"https://3.bp.blogspot.com/-iIOyrcFovSg/VP6HgvNYitI/AAAAAAABeNI/BQwcoT_bEgM/s0/35.png",
		"https://3.bp.blogspot.com/-_QkMr53nU_I/VP6HiEocq4I/AAAAAAABeNQ/_gBKC0hf5GQ/s0/36_37.png",
		"https://3.bp.blogspot.com/-S1Q_Xpi01B4/VP6HjBcHqTI/AAAAAAABeNU/s82i8SN0dUs/s0/38R.png",
		"https://3.bp.blogspot.com/-VMPPjx7mcnY/VP6Hj5-E1AI/AAAAAAABeNg/myEgYNI6wQE/s0/39R.png",
		"https://3.bp.blogspot.com/-SQDvM3nZ0Ro/VP6Hkph2J9I/AAAAAAABeNo/Ma6n5ZwAbuU/s0/40R.png",
		"https://3.bp.blogspot.com/-yOUX_-z_7c0/VP6HlcxfA_I/AAAAAAABeNw/m56vF4OE8IY/s0/41R.png",
		"https://3.bp.blogspot.com/-73Kc39caIE8/VP6Hmy3hsvI/AAAAAAABeN4/e6bN66xDglM/s0/42_43.png",
		"https://3.bp.blogspot.com/-qDb2LsaOojA/VP6HnvZeUAI/AAAAAAABeOA/pZmwOwp_tho/s0/44.png",
		"https://3.bp.blogspot.com/-Kg945-HfeWM/VP6HojpyhqI/AAAAAAABeOI/_kt1BPzSOw8/s0/45.png",
		"https://3.bp.blogspot.com/-wOKfWEAKD5E/VP6HpdqzE2I/AAAAAAABeOQ/4LqiA0Xnk7A/s0/46.png",
		"https://3.bp.blogspot.com/-gxJWGY2Xr88/VP6HqMe0M1I/AAAAAAABeOY/gErlwKmYL_o/s0/47.png",
		"https://4.bp.blogspot.com/-zLAfQydEFJA/VP6HrBx9koI/AAAAAAABeOg/4vhbgEfDjWw/s0/48.png",
		"https://1.bp.blogspot.com/-YuFBIcO2r-w/VP6Hr0xLGJI/AAAAAAABeOo/jVEhtb1K0Cw/s0/49.png",
		"https://3.bp.blogspot.com/-iDUj92Hvno8/VP6Hs8ltIYI/AAAAAAABeOw/IOYW8_l1SXc/s0/50.png",
		"https://4.bp.blogspot.com/-I1bBx3Q718c/VP6Htk0ZsjI/AAAAAAABeO4/dknR13mBpnI/s0/51.png",
		"https://4.bp.blogspot.com/--7bLBmjx3dA/VP6HupNkohI/AAAAAAABePA/Ir03O1sVU8Y/s0/52.png",
		"https://4.bp.blogspot.com/-VuxrZ3Umktw/VP6HveVgtLI/AAAAAAABePI/G4pt0maWk80/s0/53.png",
		"https://4.bp.blogspot.com/-l9QP-vyieb8/VP6HwI0L2kI/AAAAAAABePQ/8Xu9JWg-Cy8/s0/54.png",
		"https://3.bp.blogspot.com/-lGcRsQsqqys/VP6HwzaRCII/AAAAAAABePY/JICPdOJCnYA/s0/55.png"
	],
	"tittle": "",
	"uploader": "18127101@student.hcmus.edu.vn",
	"createdAt": "2021-04-25T15:04:57.544Z",
	"updatedAt": "2021-04-26T15:01:45.987Z"
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
			"email": "18127084@student.hcmus.edu.vn",
			"briefMangaDto": {
				"id": "33",
				"cover": "https://static.hocvientruyentranh.net/upload/thumb/1617867628232-001jpg.jpeg",
				"description": "Takemichi, thanh niên thất nghiệp còn trinh, được biết rằng người con gái đầu tiên và cũng là duy nhất cho đến bây giờ mà anh hẹn hò là từ trung học đã chết. Sau một vụ tai nạn, anh ta thấy mình được quay về những ngày cấp hai. Anh ta thề sẽ thay đổi tương lai và giữ lấy người con gái ấy, để làm việc đó, anh ta quyết định sẽ vươn lên làm trùm băng đảng khét tiếng nhất ở vùng Kantou.",
				"names": [
					"Tokyo卍Revengers",
					"Tokyo Manji Revengers Tokyo Revengers Tokyo卍Revengers Toukyou Revengers 東京卍リベンジャーズ"
				],
				"status": 0,
				"averageRate": 3.3333333333333335,
				"bookmarks": 12,
				"views": 589,
				"updatedAt": "2021-04-25T15:05:42.946Z",
				"briefChapterDto": {
					"id": "33-330",
					"manga": "33",
					"index": 10,
					"tittle": "",
					"views": 41,
					"createdAt": "2021-04-25T15:05:42.938Z"
				}
			}
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
			"email": "18127084@student.hcmus.edu.vn",
			"manga": "3",
			"chapter": "3-29",
			"createdAt": "2021-04-26T15:01:39.326Z",
			"briefChapterDto": {
				"id": "3-29",
				"manga": "3",
				"index": 9,
				"tittle": "",
				"createdAt": "2021-04-25T15:04:40.238Z",
				"mangaNames": [
					"Yuuna-san của Lữ quán Yuragi",
					"Yuragi-sou no Yuuna-san",
					"ゆらぎ荘の幽奈さん"
				]
			}
		},
        // Many more
	]
}
```

## Bookmarks

Nằm ở GET `host/bookmarks` 

### Route mặc định

Yêu cầu phải đăng là người dùng đã đăng nhập.

Tại header của request cần trường `Authorization` với giá trị là `Bearer <token>`

Giá trị trả về là 1 mảng `BookmarkDto`

```json
[
	{
		"email": "18127084@student.hcmus.edu.vn",
		"briefMangaDto": {
			"id": "33",
			"cover": "https://static.hocvientruyentranh.net/upload/thumb/1617867628232-001jpg.jpeg",
			"description": "Takemichi, thanh niên thất nghiệp còn trinh, được biết rằng người con gái đầu tiên và cũng là duy nhất cho đến bây giờ mà anh hẹn hò là từ trung học đã chết. Sau một vụ tai nạn, anh ta thấy mình được quay về những ngày cấp hai. Anh ta thề sẽ thay đổi tương lai và giữ lấy người con gái ấy, để làm việc đó, anh ta quyết định sẽ vươn lên làm trùm băng đảng khét tiếng nhất ở vùng Kantou.",
			"names": [
				"Tokyo卍Revengers",
				"Tokyo Manji Revengers Tokyo Revengers Tokyo卍Revengers Toukyou Revengers 東京卍リベンジャーズ"
			],
			"status": 0,
			"averageRate": 3.3333333333333335,
			"bookmarks": 12,
			"views": 589,
			"updatedAt": "2021-04-25T15:05:42.946Z",
			"briefChapterDto": {
				"id": "33-330",
				"manga": "33",
				"index": 10,
				"tittle": "",
				"views": 41,
				"createdAt": "2021-04-25T15:05:42.938Z"
			}
		}
	},
    //...
]
```

## History

Yêu cầu phải đăng là người dùng đã đăng nhập.

Tại header của request cần trường `Authorization` với giá trị là `Bearer <token>`

### Route mặc định

Nằm ở GET `host/history` 

Giá trị trả về là 1 mảng `MangaChapterViewDto`

```json
[
	{
		"email": "18127084@student.hcmus.edu.vn",
		"manga": "3",
		"chapter": "3-29",
		"createdAt": "2021-04-26T15:01:39.326Z",
		"briefChapterDto": {
			"id": "3-29",
			"manga": "3",
			"index": 9,
			"tittle": "",
			"createdAt": "2021-04-25T15:04:40.238Z",
			"mangaNames": [
				"Yuuna-san của Lữ quán Yuragi",
				"Yuragi-sou no Yuuna-san",
				"ゆらぎ荘の幽奈さん"
			]
		}
	},
    //...
]
```

## Upload Manga

Yêu cầu phải là người dùng có `UserLevel`  là `moderator`

### Signature

Để upload được ảnh, người dùng biết upload ảnh đi đâu (upload url) và xác thực danh tính bản thân với server lưu trữ ảnh. Dữ liệu cần thiết để làm việc được lấy tại GET `host/signature`

Dữ liệu trả về như sau

```json
{
	"uploadUrl": "https://api.cloudinary.com/v1_1/nettruyenz/image/upload",
	"apiKey": "667134741932688",
	"timestamp": 1621438445150,
	"signature": "d8889ebb20c82bca809de781d4d5ed04df8b4e96"
}
```

Khi có `uploadUrl` rồi thì upload ảnh bằng cách gửi POST đến nơi ấy với tham số tại body như sau:

<img src="ApiDocument.assets/image-20210519223744882-1621438669864.png" alt="image-20210519223744882" style="zoom: 200%;" />

Xem thêm tại: [Programmatically Uploading Images, Videos, and Other Files | Cloudinary](https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_rest_api)

Kết quả trả về:

```json
{
	"asset_id": "cd6cebc8f51aac057e055e3aa3583fa6",
	"public_id": "ptsoz9nz0knqu0o2eyi6",
	"version": 1621438771,
	"version_id": "cac2c664356ae2e323835f49e92b6665",
	"signature": "3cb55c51f180da089050547b83a4dec1b6e3bf5a",
	"width": 984,
	"height": 1285,
	"format": "jpg",
	"resource_type": "image",
	"created_at": "2021-05-19T15:39:31Z",
	"tags": [],
	"bytes": 561105,
	"type": "upload",
	"etag": "a8d5b676fa20f9c4ab45130efdf14220",
	"placeholder": false,
	"url": "http://res.cloudinary.com/nettruyenz/image/upload/v1621438771/ptsoz9nz0knqu0o2eyi6.jpg",
	"secure_url": "https://res.cloudinary.com/nettruyenz/image/upload/v1621438771/ptsoz9nz0knqu0o2eyi6.jpg",
	"original_filename": "eternity_p0",
	"original_extension": "png"
}
```

Sau khi upload ảnh hoàn tất, lưu lại những thông tin cần thiết để lưu trữ tại server của chúng ta.

## Data Transfer Objects (DTOs)

### ChapterDto

Là đối tượng chứa thông tin về 1 chap truyện.

```typescript
interface ChapterDto {
	id: string;
	images: string[];
	manga: string;
	index: number;
	tittle?: string;
	uploader?: string;

	views?: number;

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
	tags?: string[];
	creators?: string[];
	status?: MangaStatus;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;

	averageRate?: number;
	bookmarks?: number;
	views?: number;

	briefChapterDtos?: BriefChapterDto[];
	userCommentDtos?: UserCommentDto[];
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

