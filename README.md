# Server trả về ResponseEntity.ok("Hello")

- Khi trả về Client thì response là string

```js
//Nếu không có await thì sẽ trả về một Promise Object, sau đó gọi json() thì ra
// lỗi do response là string
let result = (await response.text()).toString();
```

# Return status No content thì khi .json() sẽ ra dòng lỗi, biện pháp là để dùng chuyển json vào trong status 200

# Lỗi Login thành công nhưng redirect qua trang admin lại bị chặn

- Do dùng user, jwt từ LocalState trực tiếp
- Chuyển sang dùng trong useLoading thì fix được
