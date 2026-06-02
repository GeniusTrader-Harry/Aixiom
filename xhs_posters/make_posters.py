# -*- coding: utf-8 -*-
"""Generate 4 Xiaohongshu (小红书) posters for AiXiom Education.
Rendered at 2x (2160x2880) for crisp text, saved as lossless PNG.

1: Cover + A-Level & IGCSE 1v1   | 2: IELTS / PF Debate 1v1 + why us
3: Mentor Harry (IC)             | 4: Mentor Cooper (UCL)

Prices in RMB (site rate: 1 USD = 7.2 RMB, rounded to nearest 100).
1-on-1 tutoring is available NOW; recorded courses are marked 建设中 (under construction).
"""
import os
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# 2x canvas for crispness (final delivered resolution is fine for XHS)
W, H = 2160, 2880
ROOT = os.path.dirname(__file__)
PUB = os.path.join(ROOT, "..", "public")

# ---- fonts ----
F_BOLD = "C:/Windows/Fonts/msyhbd.ttc"
F_REG  = "C:/Windows/Fonts/msyh.ttc"
F_LIGHT= "C:/Windows/Fonts/msyhl.ttc"
def font(path, size): return ImageFont.truetype(path, size, index=0)

# ---- colors ----
WHITE=(255,255,255); MUTED=(203,213,225); INDIGO=(129,140,248)
VIOLET=(192,132,252); SKY=(56,189,248); GOLD=(251,191,36)
MINT=(110,231,183); LILAC=(196,181,253); SLATE=(226,232,240)
# slightly more opaque cards than before -> clearer over the gradient
CARD=(255,255,255,30); CARD_BORDER=(255,255,255,60)

def aurora_bg():
    """Aurora indigo gradient + radial glows (matches site Variant A)."""
    ys, xs = np.mgrid[0:H, 0:W]
    t = ((xs/W) + (ys/H)) / 2.0
    c0=np.array([10,14,42]); c1=np.array([30,27,75]); c2=np.array([49,46,129])
    base = np.where(t[...,None]<0.5,
                    c0 + (c1-c0)*(t[...,None]/0.5),
                    c1 + (c2-c1)*((t[...,None]-0.5)/0.5))
    img = base.astype(float)
    def glow(cx, cy, color, strength, rad):
        d = np.sqrt(((xs-cx*W)**2 + (ys-cy*H)**2))
        f = np.clip(1 - d/(rad*W), 0, 1)**2
        for i in range(3):
            img[...,i] += color[i]*strength*f
    glow(0.20,0.08,(99,102,241),0.50,0.75)
    glow(0.85,0.25,(168,85,247),0.45,0.70)
    glow(0.60,0.92,(56,189,248),0.28,0.80)
    img = np.clip(img,0,255).astype(np.uint8)
    return Image.fromarray(img,"RGB").convert("RGBA")

def rounded(draw, box, r, fill=None, outline=None, width=2):
    draw.rounded_rectangle(box, radius=r, fill=fill, outline=outline, width=width)

def overlay_card(img, box, r=56, fill=CARD, border=CARD_BORDER, bw=4):
    layer = Image.new("RGBA", img.size, (0,0,0,0))
    d = ImageDraw.Draw(layer)
    rounded(d, box, r, fill=fill, outline=border, width=bw)
    img.alpha_composite(layer)

def text_shadow(d, xy, s, fnt, fill=WHITE, sh=(0,0,0,150), off=3):
    """Draw text with a soft drop shadow for legibility over the gradient."""
    x,y = xy
    d.text((x+off, y+off), s, font=fnt, fill=sh)
    d.text((x, y), s, font=fnt, fill=fill)

def text_center(d, cx, y, s, fnt, fill=WHITE, shadow=True):
    w = d.textlength(s, font=fnt)
    if shadow:
        text_shadow(d, (cx-w/2, y), s, fnt, fill=fill)
    else:
        d.text((cx-w/2, y), s, font=fnt, fill=fill)
    return fnt.size

def wrap_cn(d, s, fnt, max_w):
    lines, cur = [], ""
    for ch in s:
        if ch == "\n":
            lines.append(cur); cur=""; continue
        if d.textlength(cur+ch, font=fnt) <= max_w:
            cur += ch
        else:
            lines.append(cur); cur = ch
    if cur: lines.append(cur)
    return lines

def circle_avatar(path, size, ring):
    im = Image.open(path).convert("RGBA")
    s = min(im.size)
    im = im.crop(((im.width-s)//2,(im.height-s)//2,(im.width+s)//2,(im.height+s)//2)).resize((size,size), Image.LANCZOS)
    mask = Image.new("L",(size,size),0)
    ImageDraw.Draw(mask).ellipse((0,0,size,size),fill=255)
    out = Image.new("RGBA",(size+2*ring,size+2*ring),(0,0,0,0))
    d = ImageDraw.Draw(out)
    d.ellipse((0,0,size+2*ring,size+2*ring), fill=ring_color)
    out.paste(im,(ring,ring),mask)
    return out

def brand_header(img, d):
    f = font(F_BOLD, 60)
    try:
        bird = Image.open(os.path.join(PUB,"avatar-main.png")).convert("RGBA").resize((128,128), Image.LANCZOS)
        img.alpha_composite(bird,(140,120))
    except Exception: pass
    text_shadow(d, (296, 150), "AiXiom Education", f, WHITE)
    text_shadow(d, (296, 226), "爱科思摩教育", font(F_REG,48), MUTED)

def page_badge(d, n):
    f=font(F_BOLD,52)
    s=f"{n} / 4"
    w=d.textlength(s,font=f)
    rounded(d,(W-140-w-72, 148, W-140, 244), 48, fill=(255,255,255,235))
    d.text((W-140-w-36, 164), s, font=f, fill=(30,27,75))

def save(img, name):
    out=os.path.join(ROOT,name)
    img.convert("RGB").save(out, optimize=True)
    print("saved", out)

ring_color=(129,140,248,255)

# ============ POSTER 1 : COVER + A-LEVEL & IGCSE 1v1 ============
def poster1():
    img=aurora_bg(); d=ImageDraw.Draw(img)
    brand_header(img,d); page_badge(d,1)
    # tag pill
    pill="名校学霸导师 · 一对一在线授课"
    fp=font(F_BOLD,56); w=d.textlength(pill,font=fp)
    rounded(d,((W-w-144)//2,392,(W+w+144)//2,506),57,fill=(168,85,247,80),outline=(192,132,252,170),width=4)
    text_center(d,W//2,414,pill,fp,WHITE)
    # headline
    text_center(d,W//2,570,"A-Level & IGCSE",font(F_BOLD,168),WHITE)
    text_center(d,W//2,766,"一对一在线辅导",font(F_BOLD,128),LILAC)
    text_center(d,W//2,944,"帝国理工 · UCL 导师亲自带课，按你的进度走",font(F_REG,56),MUTED)
    # 1v1 price cards (available NOW)
    def price_card(y, title, price, subjects, accent):
        overlay_card(img,(160,y,W-160,y+340))
        d2=ImageDraw.Draw(img)
        d2.rectangle((160,y+56,184,y+284),fill=accent)  # accent bar
        text_shadow(d2,(260,y+50),title,font(F_BOLD,84),WHITE)
        text_shadow(d2,(260,y+168),"一对一辅导 ",font(F_REG,48),MUTED)
        d2.text((520,y+150),price,font=font(F_BOLD,84),fill=GOLD)
        d2.text((260,y+264),subjects,font=font(F_REG,46),fill=SLATE)
    price_card(1064,"A-Level","¥400 / 小时","经济 · 数学 · 进阶数学 · 社会学",(129,140,248))
    price_card(1444,"IGCSE","¥400 / 小时","数学 · 历史 · 经济 · 英语（EFL/ESL）",(56,189,248))
    # recorded courses notice (under construction)
    overlay_card(img,(160,1824,W-160,2020),fill=(255,255,255,20))
    text_center(d,W//2,1860,"🛠 录播课程正在制作中，敬请期待",font(F_BOLD,56),GOLD)
    text_center(d,W//2,1936,"上线后可无限次回放，现阶段先开放一对一名额",font(F_REG,46),MUTED)
    # footer hook
    text_center(d,W//2,2520,"优质教育，不该是少数人的特权",font(F_LIGHT,64),SLATE)
    text_center(d,W//2,2632,"→ 右滑看更多课程 & 导师介绍",font(F_BOLD,52),LILAC)
    save(img,"poster_1_cover.png")

# ============ POSTER 2 : IELTS / PF DEBATE 1v1 + WHY US ============
def poster2():
    img=aurora_bg(); d=ImageDraw.Draw(img)
    brand_header(img,d); page_badge(d,2)
    text_center(d,W//2,400,"更多一对一课程",font(F_BOLD,140),WHITE)
    text_center(d,W//2,580,"雅思 · PF 辩论",font(F_REG,64),LILAC)
    items=[
        ("IELTS 雅思","¥600 / 小时","听说读写全包 + 考官风格口语模考",(56,189,248)),
        ("PF 辩论","¥400 / 小时","前 NHSDLC 全国冠军 1v1 带练",(251,191,36)),
    ]
    y=720
    for title,price,sub,accent in items:
        overlay_card(img,(160,y,W-160,y+300))
        d.rectangle((160,y+50,184,y+250),fill=accent)
        text_shadow(d,(260,y+44),title,font(F_BOLD,76),WHITE)
        d.text((260,y+158),price,font=font(F_BOLD,72),fill=GOLD)
        d.text((260,y+260),sub,font=font(F_REG,44),fill=SLATE)
        y+=348
    # recorded notice
    overlay_card(img,(160,y,W-160,y+150),fill=(255,255,255,20))
    text_center(d,W//2,y+44,"🛠 A-Level / IGCSE 录播课程建设中，即将上线",font(F_REG,50),GOLD)
    y+=230
    # why us
    text_center(d,W//2,y,"为什么选我们",font(F_BOLD,96),WHITE)
    why=["名校在读学霸导师亲授，不是流水线助教",
         "一对一按你的基础和目标定制，不走通用模板",
         "以考试为导向，精准锁定提分点",
         "价格透明公道，无隐藏费用"]
    yy=y+150
    for t in why:
        d.text((280,yy),"✓",font=font(F_BOLD,68),fill=MINT)
        d.text((400,yy+4),t,font=font(F_REG,56),fill=SLATE)
        yy+=118
    text_center(d,W//2,2700,"评论区扣「课程」或私信了解详情 📩",font(F_BOLD,52),LILAC)
    save(img,"poster_2_courses.png")

# ============ MENTOR TEMPLATE ============
def mentor(name_en, photo, badge_en, badge_cn, degree, teach, tags, blurb, accent, page, fname):
    global ring_color
    ring_color=accent+(255,)
    img=aurora_bg(); d=ImageDraw.Draw(img)
    brand_header(img,d); page_badge(d,page)
    text_center(d,W//2,400,"导师介绍",font(F_BOLD,96),WHITE)
    # avatar (REAL photo)
    av=circle_avatar(os.path.join(PUB,photo),720,16)
    img.alpha_composite(av,((W-av.width)//2,576))
    d=ImageDraw.Draw(img)
    text_center(d,W//2,1380,name_en,font(F_BOLD,128),WHITE)
    # school badge pill
    bp=f"{badge_cn}  {badge_en}"
    fp=font(F_BOLD,52); w=d.textlength(bp,font=fp)
    rounded(d,((W-w-144)//2,1552,(W+w+144)//2,1666),57,fill=accent+(70,),outline=accent+(180,),width=4)
    text_center(d,W//2,1576,bp,fp,WHITE)
    # degree
    text_center(d,W//2,1740,degree,font(F_REG,56),MUTED)
    # teach card
    overlay_card(img,(220,1888,W-220,2104))
    d=ImageDraw.Draw(img)
    d.text((300,1936),"授课科目",font=font(F_REG,46),fill=MUTED)
    text_shadow(d,(300,2008),teach,font(F_BOLD,72),WHITE)
    # tags
    if tags:
        text_center(d,W//2,2172,tags,font(F_BOLD,56),GOLD)
    # blurb
    bl=wrap_cn(d, blurb, font(F_REG,56), W-520)
    yy=2300 if tags else 2260
    for ln in bl:
        text_center(d,W//2,yy,ln,font(F_REG,56),SLATE); yy+=84
    save(img,fname)

def poster3():
    mentor("Harry Zhu","avatar-harry.png","Imperial College London","帝国理工学院",
           "经济、金融与数据科学（EFDS）","经济 · 数学 · 进阶数学","",
           "专注货币经济学与行为经济学，带你跳出标准答案，真正理解经济学背后的逻辑，把分数稳稳拿下。",
           (129,140,248),3,"poster_3_harry.png")

def poster4():
    mentor("Cooper Wu","avatar-cooper.png","University College London","伦敦大学学院 UCL",
           "哲学、政治与经济（PPE）","经济 · 社会学 · 历史 · 英语","🏆 前 NHSDLC 全国辩论冠军",
           "专精奥地利学派经济学与公共选择理论，结构化、以考试为导向授课，稳步带你冲刺目标分。",
           (56,189,248),4,"poster_4_cooper.png")

if __name__=="__main__":
    poster1(); poster2(); poster3(); poster4()
    print("ALL DONE")
